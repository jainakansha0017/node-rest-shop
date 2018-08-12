const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../model/product')

router.get('/',(req,res,next) => {
	Product.find().select('-__v')
		   .exec()
		   .then(docs => {
		   		const response={
		   			count : docs.length,
		   			products : docs.map(doc => {
		   				return {
		   					id:doc._id,
			   				name:doc.name,
			   				price:doc.price,
			   				request:{
			   				type:"GET",
			   				url:"http:localhost:3000/products/"+doc._id
		   					}
		   				}
		   			})
		   		}
		   		res.status(200).json(response);
		   })
		   .catch(err => {
		   		res.status(500).json({
		   			error : err
		   		});
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
			createdProduct:{
				name:product.name,
				price:product.price,
				request:{
					type :"GET",
					url:"http:localhost:3000/products/"+product._id
				}
			}
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
 		   	  	res.status(200).json({
						name:doc.name,
						price:doc.price,
						request:{
							type :"GET",
							url:"http:localhost:3000/products/"+doc._id
						}
			});
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
	const updateOps={};
	for( const ops of req.body )
	{
		updateOps[ops.PropName]=ops.value
	}
	console.log(updateOps)
	Product.update({_id : req.params.ProductId},{$set : updateOps})
		   .exec()
		   .then(result => {
			   	res.status(200).json({
			   		request:{
			   			type:"GET",
			   			url:"http:localhost:3000/products/"+req.params.ProductId
			   		}
			   })
			   })
		   .catch(err => {
		   	res.status(500).json({
		   		error : err
		   	})
		   })
	// res.status(200).json({
	// 	message :"Updating Product: "+req.params.ProductId
	// });
});

router.delete('/:ProductId',(req,res,next) => {

	Product.remove({_id:req.params.ProductId})
		    .exec()
		    .then(result => {
		    	res.status(200).json(result);
		    })
		    .catch(err => {
		    	console.log(err)
		    	res.status(500).json({
		    		error : err
		    	})
		    });
	
});


module.exports=router;