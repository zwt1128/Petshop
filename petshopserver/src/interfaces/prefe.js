var express = require('express')
var router = express.Router()
var Prefe = require('../dbs/models/prefe')
router.get('/prefe', async (req, res) => {
    Prefe.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                prefe: []
            })
        }
        else {
            res.status(200).json({
                code: 0,
                prefe: data
            })
        }
    })
})
module.exports = router;