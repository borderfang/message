var express = require("express");
var app = express();
var rout = require("./controller/router.js");

//设置模版引擎；
app.set("view engine", "ejs");

//静态资源管理；
app.use(express.static("./public"));

//设置路由；
app.get("/", rout.showIndex);
app.get("/domessage", rout.doMessage);
app.get("/allmessage", rout.showAllMessage);
app.get("/getstart", rout.getStart);
app.get("/nostart", rout.noStart);
app.get("/rmmsg", rout.rmMsg);
app.get("/getallcounts", rout.getAllCounts);
app.listen(8080);
console.log("Running at http://127.0.0.1:8080");