var mongoose = require('mongoose');

var Transcript = mongoose.model('Transcript');


module.exports.addTranscript=function(req,res){

    var data=req.body;

	var trans=new Transcript(data);
   
	trans.save(function(err,docsId){
		if(err) 
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Transcript Inserted Successfully ...."
                });
            }

	});
	

};

module.exports.getTranscript=function(req,res){

		Transcript.find({},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})


};


module.exports.getTranscriptID=function(req,res){

		Transcript.find({_id:req.params.transcID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeleteTranscriptByID=function(req,res){
		Transcript.remove({_id:req.params.transcID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Transcript Deleted successfully');

		})

};




module.exports.EditTranscript=function(req,res){

	Transcript.update({_id:req.params.transcID},req.body,{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else

				res.json('Transcript Updated successfully');

		})


};

