const router = require("express").Router();


router.use("/", require("./index"))
router.use("/index.html", require("./index"))
router.use("/follow.html", require("./follow"))
router.use("/column.html", require("./column"))
router.use("/article.html", require("./article"))
router.use("/mydoc.html", require("./mydoc"))
router.use("/reg.html", require("./reg"))
router.use("/login.html", require("./login"))



// router.use("/index.html", require("./index"))


module.exports = router;