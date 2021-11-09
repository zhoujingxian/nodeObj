const express = require("express");
const router = express.Router();
const open = require("../../ults/mgdb").open

router.get('/', (req, res, next) => {
    open({
        collectionName: "user"
    }).then(({
        collection,
        ObjectId,
        client
    }) => {
        collection.find({
            username: req.decode.username,
            _id: ObjectId(req.decode._id)
        }).toArray((err, result) => {
            if (err) {
                res.send({
                    err: 1,
                    title: "数据读取失败"
                })
            } else {
                if (result.length > 0) {
                    delete result[0].username;
                    delete result[0].password;
                    res.send({
                        err: 0,
                        title: "数据读取成功"
                    })
                } else {
                    res.send({
                        err: 2,
                        title: "没有该数据"
                    })
                }

            }
        })
    })
})

module.exports = router;