const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/pageNotFound");

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extends: false}));


app.use("/admin", adminRouter);
app.use(express.static(path.join(__dirname, "public")));

//this mean that it starts with /
app.use(shopRouter);

app.use(errorController.pageNotFound);
const server = http.createServer(app);

server.listen(8000);
