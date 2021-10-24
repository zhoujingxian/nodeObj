const express = require("express");
const router = express.Router();
const open = require("../../ults/mgdb").open

router.get("/", (req, res, next) => {
    console.log(123)
    open({
        collectionName: "user"
    }).then(({
        collection,
        client,
        ObjectId
    }) => {
        collection.find({
            username: req.decode.username,
            _id: ObjectId(req.decode._id)
        }).toArray((err, result) => {
            if (err) {
                res.send({
                    code: 2,
                    err,
                    title: "数据读取失败"
                })
            } else {
                if (result[0]) {
                    delete result[0].username;
                    delete result[0].password
                    res.send({
                        code: 0,
                        title: "自动登录成功",
                        data: result[0]
                    })
                } else {
                    res.send({
                        code: 2,
                        title: "自动登录失败"
                    })
                }
            }
        })
    }).catch(err => {
        res.send({
            err: 1,
            title: "兜库失败"
        })
    })


})

module.exports = router;