var db = require("../models/db.js");
var ObjectId = require('mongodb').ObjectID;
module.exports = {
	showIndex: function(req, res, next) {
		res.render("index");
	},
	doMessage: function(req, res, next) {
		var content = req.query.content;
		var act = req.query.act;
		var no = req.query.no;
		var nowDate = new Date().getTime();
		db.insertOne("news", {"content": content, "time": nowDate, "act": act, "no": no}, function(err, result) {
			if(err){
				console.log(err);
				res.send("-1"); //数据插入失败；
				return;
			}
			res.send(result.ops[0]);
		})
	},
	showAllMessage: function(req, res, next) {
		var page = req.query.page;
		db.find("news", {}, {"pageamount": 5, "page": page, "sort": {"time": -1}}, function(err, result) {
			res.send(result);
		})
	},
	getStart: function(req, res, next) {
		var id = req.query.id;
	 	var act = req.query.act;
		db.updateMany("news", {"_id": ObjectId(id)}, {$set: {"act": act}}, function(err, result) {
			if(err){
				console.log(err);
				return;
			}
			res.send(result);
		})
		
	},
	noStart: function(req, res, next) {
		var id = req.query.id;
	 	var no = req.query.no;
		db.updateMany("news", {"_id": ObjectId(id)}, {$set: {"no": no}}, function(err, result) {
			if(err){
				console.log(err);
				return;
			}
			res.send(result);
		})
	},
	rmMsg: function(req, res, next) {
		var id = req.query.id;
		db.deleteMany("news", {"_id": ObjectId(id)}, function(err, result) {
			if(err){
				console.log(err);
				return;
			}
			res.send();
		})
	},
	getAllCounts: function(req, res, next) {
		db.getAllCounts("news", function(err, count) {
			if(err){
				console.log(err);
				return;
			}
			res.send(count.toString());
		})
	}
}