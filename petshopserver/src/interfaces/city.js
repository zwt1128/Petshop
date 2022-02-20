var express = require('express')
var router = express.Router()
const citydata = require('../utils/citydata')
router.get('/city', (req, res) => {
    res.send(citydata)
})
module.exports = router