var express = require('express')
var router = express.Router()
const Order = require('../dbs/models/order')
router.post('/order', (req, res) => {
    const { orderNo } = req.body
    const order = new Order(req.body);
    order.save().then((order, err) => {
        if (err) {
            res.status(200).json({
                code: -1,
                message: '生成订单失败'
            })
            return
        }
        res.status(200).json({
            code: 0,
            orderNo: orderNo
        })
    })
})
// 获取订单信息
router.get('/orderlist', async (req, res) => {
    const id = req.query.id;
    const order = await Order.findOne({ orderNo: id })
    res.status(200).json({
        code: 0,
        order: order
    })
})
// 获取所有订单
router.get('/orderall', async (req, res) => {
    const id = req.query.id;
    const allOrder = await Order.find({ userNo: id });
    res.status(200).json({
        code: 0,
        order: allOrder
    })
})
// 修改订单状态
router.get('/modify', async (req, res) => {
    let orderNo = req.query.id;
    let order = await Order.findOne({ orderNo })
    Order.updateOne({ orderNo }, { $set: { status: 1 } }, async function (error, user) {
        if (error) {
            res.status(200).json({
                code: -1,
                msg: error.message
            })
            return
        }
        // 重定向到订单详情页面
        // http://localhost:3000/orderdetail?id=363376&way=1
        res.redirect(`http://110.42.190.78:3000/orderdetail?id=${order.orderNo}&way=1`);
    })
})
module.exports = router