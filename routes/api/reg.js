const express = require("express");
const router = express.Router();
const {
    open
} = require("../../ults/mgdb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("../../ults/bcrypt");
const randomName = require("random-name");
const {
    sign
} = require("../../ults/jwt")

router.post("/", (req, res, next) => {
    // console.log(req.body)
    let {
        username,
        password,
        nikename = randomName.place(),
        age = null,
        title = null,

    } = req.body;

    if (!username || !password) {
        res.send({
            err: 1,
            title: "用户名或密码不能为空"
        })
        return;
    }
    const time = Date.now();
    let icon = "/upload/icon.png"
    if (req.files && req.files.length > 0) {
        fs.renameSync(req.files[0].path, req.files[0].path + path.parse(req.files[0].originalname).ext);
        icon = req.files[0].path + path.parse(req.files[0].originalname).ext
        // icon = "/upload/user/" + req.files[0].filename + path.parse(req.files[0].originalname).ext;
    }
    open({
        collectionName: "user"
    }).then(({
        collection,
        client
    }) => {
        collection.find({
            username
        }).toArray((err, result) => {
            if (err) {
                res.send({
                    err: 2,
                    title: "读取数据失败"
                })
            } else {
                if (result.length > 0) {
                    // icon.includes("icon.png") ? "" : fs.unlinkSync("./public" + icon);
                    icon.includes("icon.png") ? "" : fs.unlinkSync(icon);
                    res.send({
                        err: 3,
                        title: "该用户已存在"
                    })

                } else {
                    collection.insertOne({
                        username,
                        password: bcrypt.hashSync(password),
                        nikename,
                        age,
                        title,
                        icon,
                        time
                    }, (err, result) => {
                        if (err) {
                            res.send({
                                err: 1,
                                title: "用户注册失败，请重试！"
                            })
                        } else {
                            const token = sign({
                                username,
                                _id: result.insertedId
                            })
                            res.send({
                                err: 0,
                                title: "注册成功",
                                data: {
                                    _id: result.insertedId,
                                    nikename,
                                    age,
                                    title,
                                    token
                                }
                            })
                        }
                        client.close();
                    })
                }
            }
        })
    }).catch((err, client) => {
        res.send({
            err: 1,
            title: "兜库失败"
        })
    })

})

module.exports = router;