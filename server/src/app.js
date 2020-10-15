const express = require('express')
require('./db/mongoose')
const app = express()
const cors = require('cors')
const product = require('./routers/product')
const bodyParser = require('body-parser')
const product_group = require('./routers/product_group')
const morgan = require('morgan')

app.use(morgan("dev"));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(product)
app.use(product_group)

app.listen('8085', '192.168.1.152', () => {
    console.info('server started on port 8080')
})
app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
})