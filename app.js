const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')

const port = process.env.PORT || 3000

const app = express()



app.set('view engine','ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended:true})) //false in tutorial

app.use((req,res,next)=>{
    User.findById('5ee1f143bc8ce2f0f294525b')
        .then(user=>{
            req.user = new User(user.name, user.email, user.cart, user._id)     
            next()              
        })                          
        .catch(e=>console.log(e))
})

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(()=>{
    app.listen(port)
})