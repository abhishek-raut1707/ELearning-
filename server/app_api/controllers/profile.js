var mongoose = require('mongoose');
var User = mongoose.model('User');
var Expression = mongoose.model('Expression');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

//get all users list from DB
module.exports.allprofileRead = function(req, res) {

         User.find({},function(err, user) {
            if(err){
                    res.json({'data':"error"});
            }
            else{
                res.status(200);
                res.json(user);
            }

          });
	
};


module.exports.profileEdit = function(req, res) {

        var userID=req.params.userID;

        User.update({_id:userID},req.body,{multi:true},function(err,allposts){
            if(err){
                res.json({'data':"error"});
            }
            else{
                res.status(200);
                res.json({'data':'Data Updated successfully...'});
            }



        })
};



//using for user account setting changes
module.exports.checkUserName=function(req,res){

	User.find({UserName:req.params.userName},function(err41,arycomp){
		if(err41){
			res.json({'data':"error"+err41});
		}
		if(arycomp.length>0){  //username found
			res.json({'data':false});
		}
		else{
			res.json({'data':true});
		}
	});


}


//Bookmark user Expression















//used for link generation
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
