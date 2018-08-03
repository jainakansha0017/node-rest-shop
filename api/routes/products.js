const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../model/product')

router.get('/',(req,res,next) => {
	res.status(200).json({
		message :"Handling GET request to /products"
	});
});

router.post('/',(req,res,next) => {
	// const product={
	// 	name:req.body.name,
	// 	price:req.body.price
	// };
	const product=new Product({
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		price:req.body.price
	});
	product
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
			message :"Handling POST request to /products",
			createdProduct:product
	});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			})
		});
	
});

router.get("/:ProductId",(req,res,next) => {
 	const id=req.params.ProductId;
 	// if(id==="special")
 	// {
 	// 	res.status(200).json({
 	// 		message: "Handling special id",
 	// 		id :id
 	// 	});
 	// }
 	// else
 	// {
 	// 	res.status(200).json({
 	// 		message: "You passed an ID",
 	// 		id :id
 	// 	});
 	// }
 	Product.findById(id)
 		   .exec()
 		   .then(doc => {
 		   	  console.log(doc)
 		   	  if(doc)
 		   	  {
 		   	  	res.status(200).json(doc);
 		   	  }
 		   	  else
 		   	  {
 		   	  	res.status(404).json({
 		   	  		message:"No record found for given product ID"
 		   	  	});
 		   	  }
 		   	  
 		   })
 		   .catch(err => {
 		   		console.log(err);
 		   		res.status(500).json({
 		   			error:err
 		   		})
 		   });
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