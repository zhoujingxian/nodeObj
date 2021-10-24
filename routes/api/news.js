const express = require("express");
const router = express.Router();
const mgdb = require("../../ults/mgdb");

router.get("/:newsname", (req, res, next) => {
    if (req.paramsList._id) {
        return res.redirect(`/api/news/${req.params.newsname}/${req.paramsList._id}`);
    }
    mgdb.findList({
        collectionName: req.params.newsname,
        _page: req.paramsList._page,
        _limit: req.paramsList._limit,
        _sort: req.paramsList._sort,
        q: req.paramsList.q,
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })

})

router.get("/:newsname/:_id", (req, res, next) => {
    mgdb.findDetail({
        collectionName: req.params.newsname,
        _id: req.params._id
    }).then(result => res.send(result)).catch(err => res.send(err))
})

module.exports = router;