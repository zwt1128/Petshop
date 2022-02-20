var express = require("express");
var router = express.Router();

// var Ctright = require("../dbs/models/ctright");
// router.get("/ctright", async (req, res) => {
//     Ctright.find().then(function (data, err) {
//         if (err) {
//             res.status(200).json({
//                 code: -1,
//                 ctright: [],
//             });
//         } else {
//             res.status(200).json({
//                 code: 0,
//                 ctright: data,
//             });
//         }
//     });
// });

var City = require('../dbs/models/test');
router.get("/city", async (req, res) => {
    City.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                chengshi: [],
            });
        } else {
            res.status(200).json({
                code: 0,
                chengshi: data,
            });
        }
    });
});
router.get('/goodstype',async (req,res)=>{
    const type=
    City.find()
})


module.exports = router;