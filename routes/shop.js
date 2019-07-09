const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getMainPage);
router.get("/products", shopController.getUserProducts);
// router.get("/products/delete");
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.get("/orders", shopController.getOrders);
router.post("/create-order", shopController.postOrder);
router.get("/checkout", shopController.getCheckout);
router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
