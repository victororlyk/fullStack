const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

app.engine("hbs", expressHbs({
  layoutsDir: "views/layouts",
  defaultLayout: "main-layout", extname: "hbs"
}));
app.set("view engine", "hbs");

// app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extends: false}));


app.use("/admin", adminRouter.router);
app.use(express.static(path.join(__dirname, "public")));

//this mean that it starts with /
app.use(shopRouter);
app.use((req, res, next) => {
  res.status(404).render("404", {pageTitle: "not found"});
});
const server = http.createServer(app);

server.listen(8000);
