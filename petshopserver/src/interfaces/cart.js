var express = require('express')
var router = express.Router()
const Cart = require('../dbs/models/cart')
router.post('/addcart', async (req, res) => {
    const { goodsNo, userNo, count } = req.body
    const cart = await Cart.findOne({ goodsNo, userNo });
    if (cart) {
        Cart.updateOne({ goodsNo, userNo }, { $set: { count: cart.count + count } }, async (error, user) => {
            if (error) {
                res.status(200).json({
                    code: -1,
                    msg: error.message
                })
                return
            }
            res.status(200).json({
                code: 0,
                message: '加入购物车成功'
            })
        })
    } else {
        const newCart = new Cart(req.body);
        newCart.save().then((carts, err) => {
            if (err) {
                res.status(200).json({
                    code: -1,
                    message: err.message
                })
                return
            }
            res.status(200).json({
                code: 0,
                message: '加入购物车成功'
            })
        })
    }
    // res.send('购物车')
})
// 查询购物车内容
router.get('/cartList', async (req, res) => {
    if (req.session.user) {
        let userNo = req.query.userNo
        const cart = await Cart.find({ userNo });
        res.status(200).send(cart)
    } else {
        res.status(200).json({
            code: -1,
            message: '请先登录'
        })
    }
})
// 删除商品
router.get('/delete', async (req, res) => {
    let goodsNo = req.query.id;
    Cart.deleteOne({ goodsNo }, function (err) {
        if (err) {
            res.status(200).json({
                code: -1,
                message: err.message
            })
            return
        }
        res.status(200).json({
            code: 0,
            message: '删除成功'
        })
    });
})
// 更新商品数量
router.get('/updata', async (req, res) => {
    let goodsNo = req.query.id;
    let count = req.query.count;
    let userNo = req.query.userNo
    Cart.updateOne({ goodsNo, userNo }, { $set: { count: count } }, function (err, user) {
        if (err) {
            res.status(200).json({
                code: -1,
                msg: error.message
            })
            return
        }
        res.status(200).json({
            code: 0,
            message: '数量修改成功'
        })
    })
})
// 清空购物车
router.get('/deletecart', async (req, res) => {
    const userNo = req.query.id
    Cart.deleteMany({ userNo }, function (err) {
        if (err) {
            res.status(200).json({
                code: -1,
                msg: error.message
            })
            return
        }
        res.status(200).json({
            code: 0
        })
    })
})
module.exports = router