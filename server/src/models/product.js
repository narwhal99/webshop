const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true,
        trim: true,
    },
    fullindex: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true
    },
    stock: [{
        type: new mongoose.Schema({
            quantity: {
                type: Number,
            },
            size: {
                type: Number
            }
        })
    }],
    productImage: [{
        type: String
    }],
}, { timestamps: true })

productSchema.virtual('product_group', {
    ref: 'Product_group',
    localField: '_id',
    foreignField: 'product',
    justOne: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product