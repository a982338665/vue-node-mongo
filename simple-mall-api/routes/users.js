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
  res.cookie('userId','',{
    path:'/',
    maxAge:-1//0或-1失效
  })
    res.json({
      status:0,
      msg:'',
      result:''
    });
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
