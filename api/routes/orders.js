const express=require('express');
const router=express.Router();

router.get('/',(req,res,next) => {
	res.status(200).json({
		message :"Orders are fetched"
	});
});

router.post('/',(req,res,next) => {
	res.status(201).json({
		message :"Orders created"
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