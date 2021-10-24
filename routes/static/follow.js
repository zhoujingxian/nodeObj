const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const {
    findList
} = require("../../ults/mgdb");

router.get("/", (req, res, next) => {
    findList({
        collectionName: "follow",
        _page: req.paramsList._page,
        _limit: req.paramsList._limit,
        _sort: req.paramsList._sort,
        q: req.paramsList.q,
        _id: req.paramsList._id,
    }).then(({
        data
    }) => {
        const ejsData = {
            data: data
        }
        ejs.renderFile("./views/follow.ejs", ejsData, (err, data) => {
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