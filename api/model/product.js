const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name: {type : String,required : true },
	price:{ type:Number,required : true}
});

productSchema
.virtual('url')
.get(function () {
  return '/products/' + this._id;
});
module.exports=mongoose.model("Product",productSchema);