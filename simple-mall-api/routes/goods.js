var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let {productSchema} = require('../models/goods');
let {userSchema} = require('../models/users');

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


/**
 * 添加购物车
 */
router.post('/addCart', (req, res, next) => {
    //假设登录
    let userId = '100000077';
    let productId = req.body.productId;
    userSchema.findOne({userId: userId}, (err1, doc) => {
        if (err1) {
            res.json({
                status: 1,
                msg: err1.message
            })
        } else {
            if (doc) {
                let goodsItem = ''
                doc.cartList.forEach((v) => {
                    if ( v && v.productId == productId) {
                        v.productNum++;
                        goodsItem = v;
                    }
                })
                if (goodsItem) {
                    doc.save((err2, doc2) => {
                        if (err2) {
                            res.json({
                                status: 1,
                                msg: err2.message
                            })
                        } else {
                            res.json({
                                status: 0,
                                msg: '',
                                result: 'success'
                            })
                        }
                    })
                } else {
                    productSchema.findOne({productId: productId}, (err, data) => {
                        if (err) {
                            res.json({
                                status: 1,
                                msg: err.message
                            })
                        } else {
                            if (data) {
                                data._doc.productNum = '1';
                                data._doc.checked = '1';
                                //查询出来的文档数据中push
                                doc.cartList.push(data);
                                doc.save((err2, doc2) => {
                                    if (err2) {
                                        res.json({
                                            status: 1,
                                            msg: err2.message
                                        })
                                    } else {
                                        res.json({
                                            status: 0,
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        }

    });

});
module.exports = router;
