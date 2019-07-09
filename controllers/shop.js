// const products = [];
const Product = require("../models/product");

exports.getMainPage = (req, res, next) => {
	Product.findAll()
	.then(products => {
		res.render("shop/index", {
			products,
			pageTitle: "Main",
			path: "/",
			activeShop: true,
			productsCSS: true
		});
	})
	.catch(err => console.log(err));
};
exports.getUserProducts = (req, res, next) => {
	Product.findAll()
	.then(products => {
		res.render("shop/product-list", {
			products,
			pageTitle: "User Products",
			path: "/products",
			activeUserProducts: true
		});
	})
	.catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findAll({where: {id: prodId}})
	.then(products => {
		res.render("shop/product-detail", {
				product: products[0],
				pageTitle: products[0].title,
				path: `/product/${prodId}`
			}
		);
	})
	.catch(err => console.log(err));
};
exports.getCart = (req, res, next) => {
	req.user
	.getCart()
	.then(cart => {
		return cart
		.getProducts()
		.then(cartProducts => {
			res.render("shop/cart", {
				pageTitle: "Cart",
				path: "/cart",
				activeCart: true,
				cartProducts
			});
		});
	})
	.catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	let fetchedCart;
	let newQuantity = 1;

	req.user
	.getCart()
	.then(cart => {
		fetchedCart = cart;
		return cart.getProducts({where: {id: prodId}});
	})
	.then(products => {
		let product;
		if (products.length > 0) {
			product = products[0];
		}
		if (product) {
			const oldQuantity = product.cartItem.quantity;
			newQuantity = oldQuantity + 1;
			return product;
		}
		return Product.findByPk(prodId);
	})
	.then(product => {
		return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});

	})
	.then(() => {
		res.redirect("/cart");
	})
	.catch(err => console.log(err));
};
exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
	.getCart()
	.then(cart => {
		return cart.getProducts({where: {id: prodId}});
	})
	.then(products => {
		const product = products[0];
		return product.cartItem.destroy();
	})
	.then(() => {
		res.redirect("/cart");
	})
	.catch(err => console.log(err));

};

exports.getOrders = (req, res, next) => {
	//becase we have relation btw order and product
	req.user.getOrders({include: ["products"]})
	.then(orders => {
		console.log(orders);
		res.render("shop/orders", {
			pageTitle: "Orders",
			path: "/orders",
			activeOrders: true,
			orders
		});
	})
	.catch(err => console.log(err));

};
exports.postOrder = (req, res, next) => {
	let fetchedCart;
	req.user.getCart()
	.then(cart => {
		fetchedCart = cart;
		return cart.getProducts();
	})
	.then(products => {
		return req.user.createOrder()
		.then(order => {
			return order.addProducts(products, map(p => {
				p.orderItem = {quantity: p.cartItem.quantity};
				return p;
			}));
		})
		.catch(err => console.log(err));
	})
	.then(result => {
		return fetchedCart.setProducts(null);
	})
	.then(result => {
		res.redirect("/orders");
	})
	.catch(err => console.log(err));
};
exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: Checkout
	});
};

