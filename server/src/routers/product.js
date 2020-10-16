const express = require('express')
const router = new express.Router()
const Product_group = require('../models/product_group')
const Product = require('../models/product')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/product', upload.array('productImage', 5), async (req, res, next) => {
    console.log(req.files)
    try {
        const group = await Product_group.findOne({ "index": req.body.group_index })
        const checkStock = await Product.findOne({ "index": req.body.index })
        if (!checkStock) {
            const product = new Product({
                index: req.body.index,
                color: req.body.color,
                stock: {
                    quantity: req.body.quantity,
                    size: req.body.size,
                },
                productImage: req.files.map(photo => photo.path),
                fullindex: req.body.group_index + '-' + req.body.index
            })
            await group.product.push(product._id)
            await group.save()
            await product.save()
        } else {
            const checkSizeStock = checkStock.stock.findIndex(e => {
                return e.size == req.body.size
            })
            if (checkSizeStock > -1) {
                checkStock.stock[checkSizeStock].quantity += Number(req.body.quantity)
            } else {
                await checkStock.stock.push({
                    quantity: req.body.quantity,
                    size: req.body.size
                })
            }
            await checkStock.save()
        }
        res.status(201).send()
    } catch (err) {
        res.send(err)
    }
})


router.get('/product', async (req, res) => {
    try {
        const product = await Product.findOne({ "fullindex": req.query.index })
        await product.populate({
            path: 'product_group',
            populate: {
                path: 'product'
            }
        }).execPopulate()
        res.send({ product, group: product.product_group })
    } catch (err) {
        res.send(err)
    }
})


module.exports = router