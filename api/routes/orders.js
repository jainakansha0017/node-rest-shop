const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Order=require('../model/order')

router.get('/',(req,res,next) => {
	Order.find()
		 .select("producvt quantity _id")
		 .exec()
		 .then(doc => {
		 	res.status(200).json({
		 		count : doc.length,
		 		orders : doc.map(d => {
		 			return {
		 				_id : d._id,
		 				product : d.product,
		 				quantity : d.quantity,
		 				request : {
		 					type : 'GET',
		 					url : "http://localhost:3000/orders/"+d._id
		 				}
		 			}
		 		})
		 	});
		 })
		 .catch(err => {
		 	res.status(500).json({
		 		error:err
		 	})
		 })
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
		 	res.status(201).json({
		 		message : 'Order Stored',
		 		createdOrder : {
		 			_id : result._id,
		 			product : result.product,
		 			quantity : result.quantity
		 		},
		 		request : {
		 			type :'GET',
		 			url : "http://localhost:3000/orders/"+result._id
		 		}
		 	});
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
 	Order.findById(req.params.orderId)
 		 .exec()
 		 .then(order => {
 		 	if(!order)
 		 	{
 		 		return res.status(404).json({
 		 			msg : "Order not found"
 		 		})
 		 	}
 		 	res.status(200).json({
 		 		order :order,
 		 		request : {
 		 			type : "GET",
 		 			url : "http://localhost:3000/orders"
 		 		}
 		 	})
 		 })
 		 .catch(err => {
 		 	res.status(500).json({
 		 		errror : err
 		 	})
 		 })
 });


router.delete('/:orderId',(req,res,next) => {
	Order.remove({_id : req.params.orderId})
		 .exec()
		 .then(result => {
		 	res.status(200).json({
		 		msg : "order deleted"
		 	})
		 })
		 .catch(err => {
		 	res.status(500).json({
		 		error : err
		 	})
		 })
});


module.exports=router;