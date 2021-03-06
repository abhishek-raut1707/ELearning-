var mongoose = require('mongoose');

var Expression = mongoose.model('Expression');
var Expression_Context = mongoose.model('Expression_Context');
var SimilarExp = mongoose.model('SimilarExp');
var OppositeExp = mongoose.model('OppositeExp');
var RecommendedExp = mongoose.model('RecommendedExp');

var fs = require("fs");
var fs_extra = require('fs.extra');



module.exports.addExpSame=function(req,res){

    var data=req.body;

	var expsame=new SimilarExp(data);
   
	expsame.save(function(err,docsId){
		if(err) 
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Record Saved ...."
                });
            }

	});
	

};

module.exports.getsimilarEXp=function(req,res){


	SimilarExp.find({set_array: {$elemMatch: {ExpID:req.params.expID, ContextID:req.params.cntxtID}}},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})


};


module.exports.getsimilarEXpByID=function(req,res){

		SimilarExp.find({_id:req.params.similID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeletesimilarEXpByID=function(req,res){
		SimilarExp.remove({_id:req.params.similID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Context deleted successfully');

		})

};


module.exports.edit_similarEXp=function(req,res){
var dataUp={ExpID:req.params.expID, ContextID:req.params.cntxtID};

    SimilarExp.update({_id:req.params.similID},{$push:{set_array:dataUp}},{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Context Updated successfully');

    })


};
