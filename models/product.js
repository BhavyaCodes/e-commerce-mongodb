const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class Product {
    constructor(title, price, description, imageUrl, id, userId){ //optional 5th argument
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
        this._id = id ? new mongodb.ObjectId(id) : null
        this.userId = userId
    }

    save() {
        const db = getDb()
        let dbOp    //db operation
        if (this._id){
            //Update the product
            dbOp = db.collection('products').updateOne({_id: this._id},{$set:this})
        } else {
            dbOp = db.collection('products').insertOne(this)            
        }
        return dbOp
            .then(result=>{
                // console.log(result)
            })
            .catch(e=>{
                console.log(e)
            })
    }

    static fetchAll() {
        const db = getDb()
        return db.collection('products')
            .find()
            .toArray()         //find() alone returns cursor
            .then(products=>{
                return products     //array of products
            })
            .catch(e=>console.log(e))
    }
    static findById(id) {
        const db = getDb()
        return db.collection('products')
            .findOne({_id: new mongodb.ObjectId(id)})
            .then(product=>{
                return product
            })
    }

    static deleteById(id){
        const db = getDb()
        return db
            .collection('products')
            .deleteOne({_id: new mongodb.ObjectId(id)})
            .then(result=>{
                console.log('deleted')
            })
            .catch(e=>console.log(e))
    }
}

module.exports = Product