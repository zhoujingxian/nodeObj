const mongodb = require("mongodb")
const mongoCt = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const sql = "obj"
let open = ({
    dbName = sql,
    collectionName,
    url = "mongodb://127.0.0.1:27017"
}) => new Promise((resolve, reject) => {
    mongoCt.connect(url, (err, client) => {
        if (err) {
            reject(err)
        } else {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            resolve({
                collection,
                client,
                ObjectId
            })
        }
    })
})


let findList = ({
    collectionName,
    _page,
    _limit,
    _sort,
    q,
}) => new Promise((resolve, reject) => {
    open({
        collectionName
    }).then(({
        collection,
        client
    }) => {
        const reg = q ? {
            name: new RegExp(q, "g")
        } : {};
        collection.find(reg, {
            sort: {
                [_sort]: 1
            },
            skip: _page * _limit,
            limit: _limit
        }).toArray((err, result) => {
            if (!err && result.length > 0) {
                resolve({
                    err: 0,
                    title: "读取数据成功",
                    data: result
                })
            } else {
                reject(err)
            }
            client.close();
        })
    }).catch((err, client) => {
        reject({
            err: 1,
            title: "兜库失败"
        })
    })
})

let findDetail = ({
    collectionName,
    _id
}) => new Promise((resolve, reject) => {
    open({
        collectionName
    }).then(({
        collection,
        client
    }) => {
        if (_id && _id.length === 24) {
            collection.find({
                _id: ObjectId(_id)
            }).toArray((err, result) => {
                !err && result.length === 0 ? reject({
                    err: 2,
                    title: "未查询到数据"
                }) : resolve({
                    err: 0,
                    title: "数据读取成功",
                    data: result
                })
                client.close();
            })
        } else {
            reject({
                err: 1,
                title: "id格式不正确"
            })
            client.close();
        }
    })
})


exports.open = open;
exports.findList = findList;
exports.findDetail = findDetail;