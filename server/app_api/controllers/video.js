var mongoose = require('mongoose');

var Video = mongoose.model('Video');
var fs = require("fs");
var fs_extra = require('fs.extra');



module.exports.addVideo=function(req,res){

    var data=req.body;

	var vid=new Video(data);
   
	vid.save(function(err,docsId){
		if(err) 
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Video Inserted Successfully ...."
                });
            }

	});
	

};

module.exports.getVideo=function(req,res){

		Video.find({},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})


};


module.exports.getVideoByID=function(req,res){

		Video.find({_id:req.params.vidID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeleteVideoByID=function(req,res){
		Video.remove({_id:req.params.vidID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Video Deleted successfully');

		})

};




module.exports.EditVideo=function(req,res){

	Video.update({_id:req.params.vidID},req.body,{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else

				res.json('Video Updated successfully');

		})


};

