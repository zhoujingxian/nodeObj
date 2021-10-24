const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const {
    findDetail
} = require("../../ults/mgdb");

router.get("/", (req, res, next) => {
    findDetail({
        collectionName: "home",
        _id: req.paramsList._id,
    }).then(({
        data
    }) => {
        const ejsData = {
            data: data[0]
        }
        console.log(1)
        ejs.renderFile("./views/article.ejs", ejsData, (err, data) => {
            res.send(data)
        })
    }).catch(
        err => {
            res.send({
                err: 1,
                title: "兜库失败"
            })
        }
    )
})

module.exports = router;