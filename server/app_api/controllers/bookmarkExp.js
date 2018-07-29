var mongoose = require('mongoose');

var BookmarkExp = mongoose.model('BookmarkExp');
var BlacklistedExp = mongoose.model('BlacklistedExp');
var Expression = mongoose.model('Expression');

//add new bookMark Expression
module.exports.addBookMarkExp=function(req,res){

    var data=req.body;

	var bookm=new BookmarkExp(data);
   
	bookm.save(function(err,docsId){
		if(err) 
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Expression Bookmarked Successfully ...."
                });
            }

	});
	

};

//get all bookmarked Expressions of user
module.exports.getBookMarkExp=function(req,res){
       var userid=req.params.userID;

       BookmarkExp.aggregate(
       [
           {$match:{"userID":mongoose.Types.ObjectId(userid)}},
           {
            $lookup:
                {
                    from:"expressions",
                    localField:"ExpID",
                    foreignField:"_id",
                    as :"expressions"
                }
           },
           {"$unwind":"$expressions"}

       ],function(err,data){

            if(err){
                 res.json({'data':"error"});
            }
            else{

                 res.json(datac);
            }



       })


};

//delete bookmarked expression by Exp ID
module.exports.DeleteBookmarkExpByID=function(req,res){

		BookmarkExp.remove({_id:req.params.bookMrkID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Bookmarked Expression Deleted successfully');

		})

};




/*BlackList Expression code start */

//add new bookMark Expression
module.exports.addBlackListExp=function(req,res){

    var data=req.body;

	var blckl=new BlacklistedExp(data);

	blckl.save(function(err,docsId){
		if(err)
		res.json(err);
		if(!err){

                res.status(200);
                res.json({
                "token" : "Expression Blacklisted Successfully ...."
                });
            }

	});


};

//get all bookmarked Expressions of user
module.exports.getBlackListExp=function(req,res){
       var userid=req.params.userID;

       BlacklistedExp.aggregate(
       [
           {$match:{"userID":mongoose.Types.ObjectId(userid)}},
           {
            $lookup:
                {
                    from:"expressions",
                    localField:"ExpID",
                    foreignField:"_id",
                    as :"expressions"
                }
           },
           {"$unwind":"$expressions"}

       ],function(err,data){

            if(err){
                 res.json({'data':"error"});
            }
            else{

                 res.json(datac);
            }



       })


};

//delete bookmarked expression by Exp ID
module.exports.DeleteBlackListExpByID=function(req,res){

		BlacklistedExp.remove({_id:req.params.blckID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Blacklisted Expression Deleted successfully');

		})

};















/*BlackList Expression code END */





