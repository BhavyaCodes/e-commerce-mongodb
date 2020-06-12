const Product = require('../models/product')

exports.getProducts = (req,res,next)=>{
    Product
        .fetchAll()
        .then(products=>{
            res.render('shop/product-list',{
                prods: products,
                pageTitle: 'All products',
                path: '/products'
            })
        })
        .catch(e=>console.log(e))
}

exports.getProduct = (req,res)=>{
    const prodId = req.params.productId
    Product.findById(prodId).then(product=>{
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    }).catch(e=>console.log(e))
}

exports.getIndex = (req,res)=>{
    Product.fetchAll().then(products=>{
        res.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        })
    }).catch(e=>console.log(e))
}

exports.getCart = (req,res)=>{
    req.user
    .getCart()
        .then(products => {
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        })
        .catch(e=>console.log(e))
}

exports.postCart = (req,res)=>{
    const prodId = req.body.productId
    Product.findById(prodId).then(product=>{
        return req.user.addToCart(product)
    }).then(result=>{
        res.redirect('/cart')
    })
}

exports.postCartDeleteProduct = (req,res)=>{
    const prodId = req.body.productId
    req.user
        .deleteItemFromCart(prodId)
        .then(result=>{
            res.redirect('/cart')
        })
        .catch(e=>console.log(e))
}

// exports.getCheckout = (req,res)=>{
//     res.render('shop/checkout',{
//         path: '/checkout',
//         pageTitle: 'Checkout'
//     })
// }

exports.postOrder = (req,res)=>{
    req.user
        .addOrder()
        .then(result=>{
            res.redirect('/orders')
        })
        .catch(e=>console.log(e))
}

exports.getOrders = (req,res)=>{
    req.user.getOrders()
        .then(orders=>{
            res.render('shop/orders',{
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
        .catch(e=>console.log(e))
}