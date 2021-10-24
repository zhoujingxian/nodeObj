const global = require("../config/global")
const {
    verify
} = require("./jwt")
module.exports = (req, res, next) => {
    req.paramsList = {
        _page: req.query._page || req.body._page || req.headers._page || global._page,
        _limit: req.query._limit || req.body._limit || req.headers._limit || global._limit,
        _sort: req.query._sort || req.body._sort || req.headers._sort || global._sort,
        q: req.query.q || req.body.q || req.headers.q || global.q,
        _id: req.query._id || req.body._id || req.headers._id || null
    }
    console.log(req.url)

    if (/login|reg|logout|index|follow|column|article|mydoc/.test(req.url)) {
        next()
    } else {
        const token = req.query.token || req.body.token || req.headers.token
        console.log(token)
        verify(token).then(decode => {
            req.decode = decode;
            console.log(123123123)
            next();
        }).catch(err => {
            res.send({
                err: 1,
                title: "token已过期" + err
            })
        })
    }
}