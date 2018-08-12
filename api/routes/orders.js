const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Order=require('../model/order')

router.get('/',(req,res,next) => {
	res.status(200).json({
		message :"Orders are fetched"
	});
});

router.post('/',(req,res,next) => {
	const order=new Order({
		_id:new mongoose.Types.ObjectId(),
		product: req.body.productId,
		quantity:req.body.quantity
	})
	// const order={
	// 	productId:req.body.productId,
	// 	quantity:req.body.quantity
	// }
	order.save()
		 .then(result => {
		 	res.status(201).json(result);
		 })
		 .catch(err => {
		 	res.status(500).json({
		 		error : err
		 	})
		 })
	// res.status(201).json({
	// 	message :"Orders created",
	// 	createdOrder : order
	// });
});

router.get("/:orderId",(req,res,next) => {
 	res.status(200).json({
		message :"Orders no: "+req.params.orderId +" fetched"
	});
 });


router.delete('/:orderId',(req,res,next) => {
	res.status(200).json({
		message :"Deleting Order no: "+req.params.orderId
	});
});


module.exports=router;