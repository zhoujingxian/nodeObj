const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const axios = require("axios")

router.get("/", (req, res, next) => {
    axios.get("http://localhost:3000/api/news/follow").then(result => {
        console.log(result.data.data)
        ejs.renderFile("./views/follow.ejs", result.data, (err, data) => {
            res.send(data)
        })
    }).catch(err => console.log(err))

})

module.exports = router;