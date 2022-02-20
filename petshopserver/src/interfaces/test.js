var express = require('express')
var router = express.Router()
var Prefe = require('../dbs/models/test')
router.get('/test', (req, res) => {
    Prefe.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                test: []
            })
        }
        else {
            res.status(200).json({
                code: 0,
                test: data
            })
        }
    })
})
router.get('/goods', async (req, res) => {
    const id = parseInt(req.query.id)
    if (id) {
        Prefe.find({ id }).then(function (data, err) {
            if (err) {
                res.status(200).json({
                    code: -1,
                    test: []
                })
            }
            else {
                res.status(200).json({
                    code: 0,
                    test: data
                })
            }
        })
    }
})
module.exports = router