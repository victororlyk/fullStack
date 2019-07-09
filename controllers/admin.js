const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Edit-product",
		path: "/admin/add-product",
		activeAddProduct: true,
		productsCSS: true,
		editing: false
	});
};
exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;
	req.user.createProduct({
		title,
		price,
		description,
		imageUrl,
	})
	.then(() => {
		res.redirect("/");
	})
	.catch(err => console.log(err));
};

exports.getEditProducts = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) return res.redirect("/");
	const prodId = req.params.productId;
	req.user.getProducts({where: {id: prodId}})
	// Product.findByPk(prodId)
	.then(products => {
		if (!products[0]) return res.redirect("/");
		res.render("admin/edit-product", {
			pageTitle: products[0].title,
			path: "/admin/edit-product",
			editing: editMode,
			product: products[0]
		});
	})
	.catch(err => console.log(err));

};
exports.postEditProducts = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImgUrl = req.body.imageUrl;
	const updatedDescription = req.body.description;
	Product.findByPk(prodId)
	.then(product => {
		product.title = updatedTitle;
		product.price = updatedPrice;
		product.imageUrl = updatedImgUrl;
		product.description = updatedDescription;
		return product.save();
	})
	.then(() => {
		res.redirect("/admin/products");
	})
	.catch(error => console.log(error));
};

exports.postDeleteProducts = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByPk(prodId)
	.then(product => {
		return product.destroy();
	})
	.then(() => {
		res.redirect("/admin/products");
	})
	.catch(err => console.log(err));
};
exports.getAdminProducts = (req, res, next) => {
	req.user.getProducts()
	// Product.findAll()
	.then(products => {
		res.render("admin/products", {
			products,
			pageTitle: "Admin Products",
			path: "/admin/products",
			activeAdminProducts: true
		});
	})
	.catch(err => console.log(err));
};
