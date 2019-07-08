const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {

  static addProduct = (id, productPrice) => {
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) cart = JSON.parse(fileContent);
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
    });
  };

  static deleteProduct = (id, productPrice) => {
    fs.readFile(p, (err, fileContent) => {
      console.log("sdf");
      if (err) return;
      let cart = JSON.parse(fileContent);
      const updatedCart = {...cart};
      const product = updatedCart.products.find(p => p.id === id);
      if (!product) return;
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice -= productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => console.log(err));

    });
  };
  static getProducts = (cb) => {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  };

};
