require('dotenv').config()
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) =>{
    MongoClient.connect(process.env.MONGO_URL,{useUnifiedTopology:true})
    .then(client=>{
        console.log("connected to database")
        _db = client.db()
        callback()
    })
    .catch(e=>{
        console.log(e)
        throw e
    })
}

const getDb = () =>{
    if (_db){
        return _db
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
