var mongoose = require('mongoose');

var LikeDislike= mongoose.model('LikeDislike');

module.exports.addLike= async function(req,res){
           var userid=req.body.userID;
           var Obj_ID=req.body.Obj_ID;
           var opertion_type=req.body.operation_type;
        var tblData= await LikeDislike.find({$and:[{Obj_ID:mongoose.Types.ObjectId(req.body.Obj_ID)},{type:req.body.type}]}).exec();

           if(tblData.length>0){  //if already added



                console.log(tblData.length);


             var like_data_chk= await LikeDislike.find({ $and:[{Obj_ID:Obj_ID},{type:req.body.type},{like: {$elemMatch: {userID:userid}}}]   }).exec();

            var Dislike_data_chk= await LikeDislike.find({ $and:[{Obj_ID:Obj_ID},{type:req.body.type},{dislike: {$elemMatch: {userID:userid}}}]   }).exec();


                var ifExists= " ";

                if(like_data_chk.length>0){
                    ifExists='like';
                    var rem_dlik=  await LikeDislike.update({ $and:[{Obj_ID:Obj_ID},{type:req.body.type}] },{$pull:{like:{userID:userid}}}).exec();


                 }else if(Dislike_data_chk.length>0){

                     ifExists='dislike';

                     var rem_dlik=  await LikeDislike.update({ $and:[{Obj_ID:Obj_ID},{type:req.body.type}] },{$pull:{dislike:{userID:userid}}}).exec();

                }


                //checking and insert
                if(ifExists!=opertion_type){

                     var active_tbl= (opertion_type=='like')?{like:{userID:userid}}:{dislike:{userID:userid}};


                    var update_like=  await LikeDislike.update({ $and:[{Obj_ID:Obj_ID},{type:req.body.type}] },{$push:active_tbl}).exec();
                    res.json(update_like);
                }else
                res.json(rem_dlik);




           }
           else{  //insert new entry


                var data=req.body;

                if(opertion_type=='like'){
                        data.like=[{userID:userid}];
                }
                else{

                    data.dislike=[{userID:userid}];
                }

                var lik=new LikeDislike(data);

                lik.save(function(err,docsId){
                    if(err)
                    res.json(err);
                    if(!err){
                      res.status(200);
                      res.json(docsId);
                  }

                });



           }



/*

        LikeDislike.find({Obj_ID:mongoose.Types.ObjectId(req.body.Obj_ID)},function(err,data){


               res.json(data);


               if(data.length>0){  //if already added
                  /*  LikeDislike.update({$and:[{Obj_ID:req.body.objID},{type:req.body.type}]},{$push:{}},{multi:true},function(err,dataU){




                    })


               }
               else{  //insert new entry

                  /*  var data=req.body;

                    var lik=new LikeDislike(data);

                    lik.save(function(err,docsId){
                        if(err)
                        res.json(err);
                        if(!err){
                          res.status(200);
                          res.json(docsId);
                      }

                    });



               }



        });
*/


};




module.exports.getLikesByID=function(req,res){

		Like.find({$and:[{Obj_ID:req.params.objID},{type:req.params.type}]},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};




module.exports.DisLike=function(req,res){

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

