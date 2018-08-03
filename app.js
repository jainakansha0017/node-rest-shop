const express=require('express');
const app=express();
const morgan=require('morgan') // middleware to handle log , use next // show log in console
const bodyParser=require('body-parser');

const ProductRouter=require('./api/routes/products');
const orderRouter=require('./api/routes/orders');
const mongoose=require('mongoose');

// app.use((req,res,next) => {
// 	res.status(200).json({
// 		message : "It works!"
// 	});
// });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://node-shop:'+process.env.MONGO_ATLAS_PWD+'@node-rest-shop-vuldw.mongodb.net/test?retryWrites=true',{
	 useNewUrlParser: true 
});

//CORS 
app.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept, Authorization");

	if(req.method==="OPTIONS"){
		res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
		return res.status(200).json({});
	}
	next();
});
app.use('/products',ProductRouter);
app.use('/orders',orderRouter);
 //This line is approach if the url does not matches the above 2 lines
app.use((req,res,next) => {
	const error=new Error("Not Found"); // Error is an object provided by NOde js
	error.status=404;
	next(error); // propagate to app.use((error,req,res,next) => {
});

app.use((error,req,res,next) => {
	res.status=(error.status || 500); // 500 error will never come from above comes as we manually given 404.500 will come from other operations 
	res.json({
		error:{
			message:error.message
		}
	}); 
});

module.exports=app;