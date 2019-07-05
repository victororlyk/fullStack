const express = require("express");
const path = require("path");
const adminData = require("./admin");

const router = express.Router();

const rootDir = require("../util/path");


router.get("/", (req, res, next) => {
  console.log(adminData.products);
  const products = adminData.products;
  res.render("shop", {
    products,
    pageTitle: "Shop",
    path: "/",
    hasProd: products.length > 0,
    activeShop: true,
    productsCSS: true
  });
});

module.exports = router;
