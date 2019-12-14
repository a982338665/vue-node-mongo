var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let {productSchema} = require('../models/goods');

//1.连接数据库
 mongoose.connect("mongodb://swen:swen123456@122.51.144.140:27017/app?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("mongoServer is running!");
    }
});

//监听连接
mongoose.connection.on('connected', () => {
    console.error('mongo connected success!')
});
//监听错误
mongoose.connection.on('error', () => {
    console.error('mongo connected fail!')
});
//监听连接
mongoose.connection.on('disconnected', () => {
    console.error('mongo connected disconnected!')
});


/* GET users listing. */
router.get('/', function (req, res, next) {
    productSchema.find({}, (err, data) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                mgs: '',
                result: {
                    count: data.length,
                    list: data
                }
            })
        }
    });

    // res.send('respond with a resource');
});

module.exports = router;
