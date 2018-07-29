const express=require('express');
const app=express();

const ProductRouter=require('./api/routes/products');
const orderRouter=require('./api/routes/orders');

// app.use((req,res,next) => {
// 	res.status(200).json({
// 		message : "It works!"
// 	});
// });

app.use('/products',ProductRouter);
app.use('/orders',orderRouter);

module.exports=app;