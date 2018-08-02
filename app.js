const express=require('express');
const app=express();
const morgan=require('morgan') // middleware to handle log , use next // show log in console
const ProductRouter=require('./api/routes/products');
const orderRouter=require('./api/routes/orders');

// app.use((req,res,next) => {
// 	res.status(200).json({
// 		message : "It works!"
// 	});
// });
app.use(morgan('dev'));
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