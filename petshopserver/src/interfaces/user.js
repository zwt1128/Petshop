var express = require('express')
var router = express.Router()
const User = require('../dbs/models/user')
// 注册
router.post('/register', async (req, res) => {
    const { nickname, phone, password, no } = req.body
    const user = await User.findOne({ phone });
    if (user) {
        res.status(200).json({
            code: -1,
            msg: '该手机号已经被注册'
        })
        return
    }
    const newUser = new User({
        nickname,
        phone,
        password,
        no
    })
    newUser.save().then((user, err) => {
        if (err) {
            res.status(200).json({
                code: -1,
                msg: '注册失败'
            })
            return
        }
        res.status(200).json({
            code: 0,
            msg: '恭喜您注册成功'
        })
    })
});
// 登录
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone, password });
    // console.log(user);
    if (user) {
        req.session.user = user;
        res.status(200).json({
            code: 0,
            msg: '登录成功',
        })
    } else {
        res.status(200).json({
            code: -1,
            msg: '账号或密码错误'
        })
    }
})
// 获取用户信息
router.get('/getUser', (req, res) => {
    if (req.session.user) {
        const { phone, nickname, photo, address, no } = req.session.user;
        res.status(200).json({
            phone,
            nickname,
            photo,
            address,
            no
        })
    } else {
        res.status(200).json({
            phone: '',
            nickname: '',
            photo: '',
            address: '',
        })
    }
})
// 修改密码
router.post('/modify', async (req, res) => {
    let { prpassword, newPassword, phone } = req.body
    const user = await User.findOne({ phone, password: prpassword });
    if (user) {
        User.updateOne({ phone }, { $set: { password: newPassword } }, async function (error, user) {
            if (error) {
                res.status(200).json({
                    code: -1,
                    msg: error.message
                })
                return
            }
            const newuser = await User.findOne({ phone });
            req.session.user = null;
            req.session.destroy()
            res.status(200).json({
                code: 0,
                msg: '修改密码成功',
            })
        })
    } else {
        res.status(200).json({
            code: -1,
            msg: '原密码错误',
        })
    }
})
// 修改地址
router.post('/address', async (req, res) => {
    let { address, phone } = req.body;
    // console.log(address, phone);
    User.updateOne({ phone }, { $set: { address } }, async function (error, user) {
        if (error) {
            res.status(200).json({
                code: -1,
                msg: error.message
            })
            return
        }
        const newuser = await User.findOne({ phone });
        req.session.user = newuser;
        res.status(200).json({
            code: 0,
            msg: '保存地址成功',
        })
    })
})
// 退出登录
router.get('/exit', (req, res) => {
    req.session.user = null;
    req.session.destroy()
    res.status(200).json({
        code: 0
    })
})
module.exports = router