var mongoose = require('mongoose');

var Expression = mongoose.model('Expression');
var Expression_Context = mongoose.model('Expression_Context');
var Exp_Context_VersionHistory = mongoose.model('Exp_Context_VersionHistory');
var SimilarExp = mongoose.model('SimilarExp');
var OppositeExp = mongoose.model('OppositeExp');
var RecommendedExp = mongoose.model('RecommendedExp');

var fs = require("fs");
var fs_extra = require('fs.extra');



module.exports.addExpContext=function(req,res){

    var data=req.body;
	var expc=new Expression_Context(data);   
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
	

};

module.exports.getExpContext=function(req,res){
	
		Expression_Context.find({ExpID:req.params.ExpID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})


};
/*
module.exports.getallExpression=function(req,res){
	

	Expression_Context.aggregate([
		{
			$lookup:{
				from:"expressions",
				localField:"ExpID",
				foreignField:"_id",
				as :'expressiondata'				
			}
		},
		{$unwind:'$expressiondata'}		

		],function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})

};

*/
module.exports.getExpContextByID=function(req,res){

		Expression_Context.find({_id:req.params.cntxtID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeleteExpContextByID=function(req,res){
		Expression_Context.remove({_id:req.params.cntxtID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Context deleted successfully');

		})

};




module.exports.ExpContextAcive=function(req,res){

    var flgchek=req.body.active_flag;

    var dataUp ={flag:flgchek};

    Expression_Context.update({_id:req.params.cntxtID},{$push:{flag_history:dataUp},active_flag:flgchek},{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Context Updated successfully');

    })


};

module.exports.ExpContextEdit=function(req,res){


	Expression_Context.update({_id:req.params.cntxtID},req.body,{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else

				res.json('Context Updated successfully');

		})


};





/*Edit Context API code for Support start*/


module.exports.getExpContextByID_Support=function(req,res){

        var contectID=req.params.cntxtID;

		Expression_Context.find({_id:contectID},{_id:0},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{


                Exp_Context_VersionHistory.find({$and:[{ContextID:contectID},{version:datac[0].version}]},function(err,dataver){
                    if(err){
                        res.json({'data':"error"});
                    }
                    else{

                            if(dataver.length>0){ //found

                                res.json(dataver);

                            }
                            else{
                                    console.log(datac.length);
                                var objH=datac[0].toObject();
                                    objH.ContextID=contectID;


                                  	var expc=new Exp_Context_VersionHistory(objH);

                                	expc.save(function(err,Docs){
                                		if(err)
                                		res.json(err);
                                		if(!err){

                                                res.status(200);
                                                res.json(Docs);
                                            }

                                	});


                            }

                    }

                })


			}

		})



};





module.exports.Exp_Context_VersionHistoryEdit=function(req,res){

	Exp_Context_VersionHistory.update({_id:req.params.cntxtHisID},req.body,{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else

				res.json('Context Updated successfully');

		})


};





/*Edit Context API code for Support start*/




