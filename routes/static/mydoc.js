const router = require("express").Router();
const ejs = require("ejs")

router.get("/", (req, res, next) => {
    ejs.renderFile("./views/mydoc.ejs", (err, data) => {
        res.send(data);
    })
})

module.exports = router;