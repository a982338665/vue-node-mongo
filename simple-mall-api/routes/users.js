var express = require('express');
var router = express.Router();
let {userSchema} = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * 登出
 */
router.post('/logout', function (req, res, next) {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1//0或-1失效
    })
    res.json({
        status: 0,
        msg: '',
        result: ''
    });
});

/**
 * 查询当前用户的购物车数据
 */
router.get("/cartList", function (req,res,next) {
    let userId = req.cookies.userId;
    userSchema.findOne({userId:userId}, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'',
                    result:doc.cartList
                });
            }
        }
    });
});

//购物车删除
router.post("/cartDel", function (req,res,next) {
    let userId = req.cookies.userId,productId = req.body.productId;
    userSchema.update({
        userId:userId
    },{
        $pull:{
            'cartList':{
                'productId':productId
            }
        }
    }, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    });
});


//修改商品数量
router.post("/cartEdit", function (req,res,next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    userSchema.update({"userId":userId,"cartList.productId":productId},{
        "cartList.$.productNum":productNum,
        "cartList.$.checked":checked,
    }, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    })
});


/**
 * 登录校验
 */
router.post('/checkLogin', function (req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: 0,
            msg: '',
            result: {userName: req.cookies.userName}
        });
    } else {
        res.json({
            status: 1,
            msg: '未登录API',
            result: ''
        });
    }

});


router.post('/login', function (req, res, next) {
    //查询参数
    let params = {
        userName: req.body.userName,
        userPwd: req.body.userPwd,
    }
    userSchema.findOne(params, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60//一小时
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                //可以将用户信息存在session中
                //req.session.user = doc;
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    status: '1',
                    msg: '用户名或密码不存在',
                });
            }
        }
    });

});

module.exports = router;
