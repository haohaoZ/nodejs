var mongoose =require ("mongoose");
var Schema = mongoose.Schema;

var Goods = new Schema({
	goods_name:String,
  	goods_id:String,
  	price:String,
  	sales_num:String,
  	img:String,
	create_date:{ type: Date, default: Date.now }
});

var GoodsModel=mongoose.model('goods',Goods);

module.exports = GoodsModel;
