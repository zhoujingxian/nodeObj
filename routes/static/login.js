const router = require("express").Router();
const ejs = require("ejs")

router.get("/", (req, res, next) => {
    ejs.renderFile("./views/login.ejs", (err, data) => {
        res.send(data);
    })
})

module.exports = router;