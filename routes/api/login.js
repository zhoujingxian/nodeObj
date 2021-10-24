const {
    sign
} = require("../../ults/jwt")
const router = require("express").Router();
const open = require("../../ults/mgdb").open;
const compareSync = require("../../ults/bcrypt").compareSync

router.post("/", (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) {
        return res.send({
            err: 1,
            title: "用户名或密码不能为空"
        });
    }

    // 兜库
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
                    err: 3,
                    title: "数据读取失败"
                });
                client.close()
            } else {
                if (result[0]) {
                    //校验密码是否正确
                    if (compareSync(password, result[0].password)) {
                        const token = sign({
                            username,
                            _id: result[0]._id
                        })
                        // 删除用户信息中的用户名和密码
                        delete result[0].username;
                        delete result[0].password;

                        res.send({
                            err: 0,
                            title: "登录成功",
                            data: result[0],
                            token: token
                        })
                        // delete username
                    } else {
                        res.send({
                            err: 5,
                            title: "用户名或密码不正确",
                        })
                    }
                    client.close();
                } else {
                    res.send({
                        err: 4,
                        title: "该用户不存在"
                    })
                    client.close()
                }
            }
        })
    }).catch(err => {
        res.send({
            err: 2,
            title: "兜库失败"
        })
    })
})

module.exports = router;