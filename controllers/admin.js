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
  const product = new Product(null, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  product.save(product);
  res.redirect("/");
};

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.getProduct(prodId, product => {
    if (!product) return res.redirect("/");
    res.render("admin/edit-product", {
      pageTitle: "Edit-product",
      path: "/admin/edit-product",
      editing: editMode,
      product
    });
  });

};
exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImgUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteProduct(prodId);
  res.redirect("/admin/products");
};
exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      activeAdminProducts: true
    });
  });
};
