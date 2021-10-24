const router = require("express").Router();
const ejs = require("ejs");
const reg = require("../api/reg")

router.get("/", (req, res, next) => {
    ejs.renderFile("./views/reg.ejs", (err, data) => {
        res.send(data);
    })
})

module.exports = router;