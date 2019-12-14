let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//"productId":"201710003","productName":"平衡车","salePrice":1999,"productImage":"pingheng.jpg","productUrl":""
let productSchema = new Schema({
    productId: String,
    productName: String,
    salePrice: Number,
    productImage: String,
});

//根据骨架创建模型:参数 模型名称，骨架名称，集合名称   常用于读取数据库
exports.productSchema = mongoose.model('Good',productSchema,'goods');



