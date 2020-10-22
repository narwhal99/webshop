const mongoose = require('mongoose')

const product_groupSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true,
        //not unique! ??
    },
    name: {
        type: String
    },
    price: {
        type: Number,
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    tag: Array
}, { timestamps: true })

product_groupSchema.pre('remove', async function (next) {
    console.log(this)
    next()
})

const product_group = mongoose.model('Product_group', product_groupSchema)
module.exports = product_group


