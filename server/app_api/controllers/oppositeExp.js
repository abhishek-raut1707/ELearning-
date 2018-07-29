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

	var OppositeExpV=new OppositeExp(data);
   
	OppositeExpV.save(function(err,docsId){
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

		OppositeExp.find({set_array: {$elemMatch: {ExpID:req.params.expID, ContextID:req.params.cntxtID}}},function(err,datac){
            if(err){
                res.json({'data':"error"});
            }
            else{

                res.json(datac);
            }

        })



};


module.exports.getsimilarEXpByID=function(req,res){

		OppositeExp.find({_id:req.params.similID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeletesimilarEXpByID=function(req,res){
		OppositeExp.remove({_id:req.params.similID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Context deleted successfully');

		})

};


module.exports.edit_similarEXp=function(req,res){


    OppositeExp.update({_id:req.params.similID},{$push:{set_array:dataUp}},{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Context Updated successfully');

    })


};
