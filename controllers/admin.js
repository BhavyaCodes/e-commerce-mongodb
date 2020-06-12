const Product = require('../models/product')

exports.getAddProduct = (req,res,next)=>{
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next)=>{
    const product = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        null, //product id
        req.user._id
    )
    product.save()
        .then(result=>{
            res.redirect('/admin/products')
        }).catch(e=>{
            console.log(e)
        })
}

exports.getEditProduct = (req,res,next)=>{
    const editMode = req.query.edit
    if(editMode !== 'true'){
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId)
        .then(product=>{
            if(!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product',{
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            })
        })
}

exports.postEditProduct = (req,res)=>{
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedImageUrl = req.body.imageUrl
    const updatedDesc = req.body.description

    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId, req.user._id)
    product.save()
        .then(result=>{
            console.log('UPDATED PRODUCT')
            res.redirect('/admin/products')
        })
        .catch(e=>console.log(e))
}

exports.getProducts = (req,res)=>{
    Product.fetchAll()
        .then(products=>{
            res.render('admin/products',{
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        })
        .catch(e=>console.log(e))
}

exports.postDeleteProduct = (req, res) =>{
    const prodId = req.body.productId
    Product.deleteById(prodId)
        .then(()=>{
            res.redirect('/admin/products')
        })
        .catch(e=>console.log(e))
}