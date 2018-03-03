var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require('multiparty');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('register', { title: '注册画面' });
});

router.get('/goods_add', function(req, res, next) {
  res.render('goods_add', { title: 'shangpin' });
});

router.get('/showgoods', function(req, res) {
  GoodsModel.find({}, function(err, docs) {
		res.render("showgoods", {list: docs});
	})
});

router.post('/api/register',function(req,res){
	//所有的post参数都被包装到req.body中
	var username = req.body.username;
	var psw = md5(req.body.psw);
	//保存功能 mongodb的调用需要使用mongoose组件
	var um = new UserModel();
	um.username = username;
	um.psw = psw;
	um.save(function(err){
		if(err){
			console.log("注册失败",+err);
			res.send("注册失败")
		}else{
			console.log("注册成功");
			res.send("注册成功")
		}
	})
})

router.post("/api/add_goods", function(req, res){
	var Form = new multiparty.Form({
		uploadDir: "./public/imgs"
	})
	Form.parse(req, function(err, body, files){
		var goods_name = body.goods_name[0];
		var price = body.price[0];
		var detail = body.detail[0];
		var imgName = files.img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\") + 1);

		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.price = price;
		gm.detail = detail;
		gm.img = imgName;
		gm.save(function(err){
			if(!err) {
				res.send("商品保存成功");
			} else {
				res.send("商品保存失败");
			}
		})
	})
})


module.exports = router;
