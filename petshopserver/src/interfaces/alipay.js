/**
 * @type {createApplication}
 */

const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const request = require('request')
let router = express.Router();
const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const AlipayFormData = require('alipay-sdk/lib/form').default;
const Order = require('../dbs/models/order')
// const Order = require('../models/Order')
// const Cart = require("../models/cart");
// const OrderList = require('../models/orderlist')
/**--------------------------------------------------------------------- */

router.get('/test1', async (req, res) => {
    let id = req.query.orderNo;
    let order = await Order.findOne({orderNo: id})
    let sum = 0
    order.goods.forEach(item => {
        sum += item.price * item.count
    })
    var price = sum;
    var beizhu = '商品';
    const alipaySdk = new AlipaySdk({
        appId: '2021000118632570', // 沙箱中的 appId
        privateKey: fs.readFileSync(path.join(__dirname, '../alipay_key/app_private_key.pem'), 'ascii'), // 应用私钥字符串
        signType: 'RSA2', // 签名算法,默认 RSA2
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../alipay_key/alipay_public_key.pem'), 'ascii'), // 支付宝公钥，需要对结果验签时候必填
        gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
        timeout: 5000,
        camelcase: true
    });
    const outTradeNo = Date.now() + "20576";
    const formData = new AlipayFormData();
    const timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    formData.setMethod('get');
    formData.addField('appId', '2021000118632570'); //沙箱环境appID
    formData.addField('charset', 'utf-8');
    formData.addField('signType', 'RSA2'); //沙箱中的密钥设置为RSA
    formData.addField('timestamp', moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
    formData.addField('bizContent', {
        outTradeNo: outTradeNo, //【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
        productCode: 'FAST_INSTANT_TRADE_PAY', //【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: price,                     //【必选】订单总金额，精确到小数点后两位,这里是从前台支付时获取的
        subject: '商品',
        body: beizhu,
        timestamp: timestamp
    });
    // 支付成功之后返回的界面
    formData.addField('returnUrl', `http://110.42.190.78:8888/api/modify?id=${id}`);
    const result = await alipaySdk.exec('alipay.trade.page.pay', {}, {
        formData: formData
    });
    return res.json(result)
});
module.exports = router
