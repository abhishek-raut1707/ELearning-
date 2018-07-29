var mongoose = require('mongoose');

var Expression = mongoose.model('Expression');
var Expression_Context = mongoose.model('Expression_Context');
var SimilarExp = mongoose.model('SimilarExp');
var OppositeExp = mongoose.model('OppositeExp');
var RecommendedExp = mongoose.model('RecommendedExp');

var fs = require("fs");
var fs_extra = require('fs.extra');
var ContextT=require('./context');



module.exports.addExpression=function(req,res){

    var data=req.body;
	console.log('this is the input for expression', JSON.stringify(req.body.name))
	var exp=new Expression(data);
   
	exp.save(function(err,docsId){
		if(err) 
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Expression Saved"
                });
            }

	});
	

};


module.exports.addExpressionFroMConfluence=function(req,res){

    var title=req.body.title;
var data=req.body.data;



	Expression.find({name:title},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
				if(datac.length<=0){
					
					
					var exp=new Expression();
				   	exp.name=title;
					exp.save(function(err,docsId){
						if(err) 
						res.json(err);
						if(!err){
							
console.log("EEEEEEEEEEE IF"+docsId._id);
						save_cntect(data,docsId._id,res);					

					    }

					});						
				


	
				}
				else{

					console.log("EEEEEEEEEEE ELSE"+datac[0]._id);
					
					save_cntect(data,datac[0]._id,res);		
				}



			
				//res.json(datac);
			}
			
	})	


	

};

function save_cntect(data,ExpID,res){
	var expc=new Expression_Context(data);
	   expc.ExpID=ExpID;
	expc.save(function(err,docsId){
		if(err) 
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Expression Context Saved ...."
                });
            }

	});

}


module.exports.getallExpressionwithContext=function(req,res){
	Expression.aggregate(
		[
			//{ "$match": { "_id":mongoose.Types.ObjectId(req.params.expID)} },
			{ "$sort": { "date": -1 } },

			{
				$lookup:{
				 from:"expression_contexts",
				 localField:"_id",
				 foreignField:"ExpID",
				 as:'context'
				}
			},
			{ "$unwind": "$context" }


		],function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{

				res.json(datac);
			}

		})


};


module.exports.getExpression=function(req,res){

		Expression.find({},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})


};


module.exports.getExpressionByID=function(req,res){

		Expression.find({_id:req.params.expID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeleteExpressionByID=function(req,res){
		Expression.remove({_id:req.params.expID},function(err,dta){
			if(err)
				res.json(err);
			else
				{

                    res.json({token:'Expression deleted successfully'});


				}
		})

};


module.exports.ExpAcive=function(req,res){
    var flgchek=req.body.active_flag;

    var dataUp ={flag:flgchek};

	Expression.update({_id:req.params.expID},{$push:{flag_history:dataUp},active_flag:flgchek},{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Expression updated successfully');

		})

};


module.exports.ExpressionEdit=function(req,res){

    var flgchek=req.body.active_flag;

var dataUp ={flag:flgchek};

	Expression.update({_id:req.params.expID},req.body,{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Expression updated successfully');

		})




		
};

