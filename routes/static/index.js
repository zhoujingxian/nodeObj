const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const axios = require("axios");

router.get("/", (req, res, next) => {
    function getBanner() {
        return axios.get("http://localhost:3000/api/news/banner")
    }

    function getList() {
        return axios.get("http://localhost:3000/api/news/home")
    }

    axios.all([getBanner(), getList()]).then(axios.spread((data1, data2) => {
        const ejsData = {
            bannerData: data1.data.data,
            listData: data2.data.data
        };
        ejs.renderFile("./views/index.ejs", ejsData, (err, data) => {
            res.send(data)
        })

    })).catch(err => {
        console.log(err)
    })

})

module.exports = router;