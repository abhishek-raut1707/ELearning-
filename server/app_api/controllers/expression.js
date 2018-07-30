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


module.exports.addExpressionFroMConfluence=function(contextData, title){

	// console.log('Data from confluence ', contextData);

		Expression.find({name:title},function(err,datac){
			if(err){
				// res.json({'data':"error"});
				console.log(err);
				
			}
			else{
				if(datac.length<=0){
					
					
					var exp=new Expression();
				   	exp.name=title;
					exp.save(function(err,docsId){
						if(err) 
						console.log(err);
						
						// res.json(err);
						if(!err){
							
// console.log("EEEEEEEEEEE IF"+docsId._id);
					for(var i = 0; i < contextData.length; i++) {
						var data = contextData[i];
						save_cntect(data,docsId._id);		
					}						
					}else{

					// console.log("EEEEEEEEEEE ELSE"+datac[0]._id);
					
					for(var i = 0; i < contextData.length; i++) {
						var data = contextData.data[i];
					// Deleted res from save_cntect parameters
						save_cntect(data,datac[0]._id);	
					}
				}
			


			
				//res.json(datac);
			});

	

};


// Deleted res from the save_cntect parameters
function save_cntect(data,ExpID){
	
	var expc = new Expression_Context();
	expc.ExpID=ExpID;
	expc.examples = data.examples;
	expc.level = data.level;
	expc.further_suggestion = data.further_suggestion;
	expc.popularity = data.popularity;
	expc.notes = data.notes;
	expc.meaning = data.meaning;
	expc.active_flag = data.active_flag;
	expc.HTM = data.HTM;
	expc.Meaning_ID = data.Meaning_ID;
	   
	// console.log('expc', expc);
	
	expc.save(function(err,docsId){
		if(err) 
		console.log(err);
		
		// res.json(err);
		if(!err){

                // res.status(200);
                // res.json({
                // "token" : "Expression Context Saved ...."
				// });
				
				console.log('Successfully uploaded data to db');
				
            }

	});

}
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

