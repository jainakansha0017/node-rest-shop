const express=require('express');
const router=express.Router();

router.get('/',(req,res,next) => {
	res.status(200).json({
		message :"Handling GET request to /products"
	});
});

router.post('/',(req,res,next) => {
	res.status(201).json({
		message :"Handling POST request to /products"
	});
});

router.get("/:ProductId",(req,res,next) => {
 	const id=req.params.ProductId;
 	if(id==="special")
 	{
 		res.status(200).json({
 			message: "Handling special id",
 			id :id
 		});
 	}
 	else
 	{
 		res.status(200).json({
 			message: "You passed an ID",
 			id :id
 		});
 	}
 });

router.patch('/:ProductId',(req,res,next) => {
	res.status(200).json({
		message :"Updating Product: "+req.params.ProductId
	});
});

router.delete('/:ProductId',(req,res,next) => {
	res.status(200).json({
		message :"Deleting Product: "+req.params.ProductId
	});
});


module.exports=router;