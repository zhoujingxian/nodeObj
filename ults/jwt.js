const jwt = require("jsonwebtoken");
module.exports = {
    sign: ({
        username,
        _id
    }) => jwt.sign({
        username,
        _id
    }, "obj", {
        expiresIn: 3600 * 24
    }),
    verify: token => new Promise((resolve, reject) => {
        jwt.verify(token, "obj", (err, decode) => {
            err ? reject(err) : resolve(decode);
        })
    })
}