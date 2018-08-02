const express=require('express');
const router=express.Router();

router.get('/',(req,res,next) => {
	res.status(200).json({
		message :"Orders are fetched"
	});
});

router.post('/',(req,res,next) => {
	const order={
		productId:req.body.productId,
		quantity:req.body.quantity
	}
	res.status(201).json({
		message :"Orders created",
		createdOrder : order
	});
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