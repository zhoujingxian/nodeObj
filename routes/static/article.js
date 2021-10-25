const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const axios = require("axios")

router.get("/", (req, res, next) => {
    axios.get(`http://localhost:3000/api/news/home/${req.paramsList._id}`).then(result => {
        const ejsData = {
            data: result.data.data[0]
        }
        ejs.renderFile("./views/article.ejs", ejsData, (err, data) => {
            res.send(data)
        })
    }).catch(err => console.log(err))
})

module.exports = router;