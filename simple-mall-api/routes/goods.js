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


function convertParams(priceChecked, params) {
    let price1 = '', price2 = ''
    if (priceChecked != 'all') {
        switch (priceChecked) {
            case '0':
                price1 = 0;
                price2 = 100;
                break;
            case '1':
                price1 = 100;
                price2 = 500;
                break;
            case '2':
                price1 = 500;
                price2 = 1000;
                break;
            case '3':
                price1 = 1000;
                price2 = 5000;
                break;
        }
        params = {
            salePrice: {
                $gt: price1,
                $lte: price2
            }
        }
    }
    return params;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let sort = req.query.sort;
    let priceChecked = req.query.priceChecked;
    let params = {};
    params = convertParams(priceChecked, params);
    let goodsModel = productSchema.find(params).skip((page - 1) * pageSize).limit(pageSize);
    goodsModel.sort({'salePrice': sort});
    goodsModel.exec((err, data) => {
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
