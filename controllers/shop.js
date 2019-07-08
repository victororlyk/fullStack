// const products = [];
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getMainPage = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      products,
      pageTitle: "Main",
      path: "/",
      activeShop: true,
      productsCSS: true
    });
  });
};
exports.getUserProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      products,
      pageTitle: "User Products",
      path: "/products",
      activeUserProducts: true
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getProduct(prodId, product => {
    res.render("shop/product-detail", {
        product,
        pageTitle: "product",
        path: `/product/${prodId}`
      }
    );
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id);
        if (cartProductData) {
          cartProducts.push({product, qty: cartProductData.qty});
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        activeCart: true,
        cartProducts
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProduct(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProduct(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart')
  });

};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    activeOrders: true
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: Checkout
  });
};
