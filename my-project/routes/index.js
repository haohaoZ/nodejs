var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '注册画面' });
});

router.get('/goods_add', function(req, res, next) {
  res.render('goods_add', { title: 'shangpin' });
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











module.exports = router;
