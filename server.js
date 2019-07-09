const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/pageNotFound");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extends: false}));

app.use((req, res, next) => {
	User.findByPk(1)
	.then(user => {
		req.user = user;
		next();
	})
	.catch(err => console.log(err));
});
app.use("/admin", adminRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(shopRouter);
app.use(errorController.pageNotFound);


const server = http.createServer(app);
Product.belongsTo(User, {
	constraints: true,
	onDelete: "CASCADE"
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
// .sync({force: true})
.sync()
.then(result => {
	return User.findByPk(1);
})
.then(user => {
	if (!user) {
		return User.create({
			name: "vitya",
			email: "sdfome"
		});
	}
	return Promise.resolve(user);
})
.then(user => {
	return user.createCart();
})
.then(() => {
	server.listen(8000);
})
.catch(err => console.log(err));

