const express = require('express')
const router = new express.Router()
const Product_group = require('../models/product_group')
const Product = require('../models/product')

router.post('/product-group', async (req, res) => {
    try {
        const product_group = new Product_group(req.body)
        await product_group.save()
        res.status(201).send()
    } catch (e) {
        res.send(e)
    }
})

//get every index 
router.get('/product-group/index', async (req, res) => {
    try {
        const product = await Product_group.find({})
        const product_index = product.map(product => {
            return product.index
        })
        res.send(product_index)
    } catch (err) {
        res.send(err)
    }
})

//get all group-product
router.get('/product-group/all', async (req, res) => {
    try {
        const products = await Product_group.find({}).populate({
            path: "product",
            model: "Product"
        })
        res.send(products)
    } catch (e) {
        res.send(e)
    }
})

//get group by index
router.get('/product-group', async (req, res) => {
    try {
        const products = await Product_group.find({ index: req.query.index }).populate({
            path: "product",
            model: "Product"
        })
        res.send(products)
    } catch (e) {
        res.send(e)
    }
})

//get group by tag
router.get('/product-group/tag', async (req, res) => {
    console.log(req.query.tag)
    try {
        const products = await Product_group.find({ tag: { $all: req.query.tag } }).populate({
            path: "product",
            model: "Product"
        })
        res.send(products)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router