const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const {
    findList
} = require("../../ults/mgdb");

router.get("/", (req, res, next) => {

    console.log(req.paramsList)

    function banner() {
        return new Promise((resolve, reject) => {
            findList({
                collectionName: "banner",
                _page: req.paramsList._page,
                _limit: req.paramsList._limit,
                _sort: req.paramsList._sort,
                q: req.paramsList.q,
                _id: req.paramsList._id,
            }).then(({
                data
            }) => {
                resolve(data)
            }).catch(
                err => {
                    res.send({
                        err: 1,
                        title: "兜库失败"
                    })
                }
            )
        })

    }

    function list() {
        return new Promise((resolve, reject) => {
            findList({
                collectionName: "home",
                _page: req.paramsList._page,
                _limit: req.paramsList._limit,
                _sort: req.paramsList._sort,
                q: req.paramsList.q,
                _id: req.paramsList._id,
            }).then(({
                data
            }) => {
                resolve(data)
            }).catch(err => {
                res.send({
                    err: 1,
                    title: "兜库失败"
                })
            })
        })
    }
    Promise.all([banner(), list()]).then(reqData => {
        const ejsData = {
            bannerData: reqData[0],
            listData: reqData[1]
        };

        console.log(reqData[1])
        ejs.renderFile("./views/index.ejs", ejsData, (err, data) => {
            res.send(data)
        })
    })


})

module.exports = router;