var mongoose = require('mongoose');
var Expression = mongoose.model('Expression');
var Expression_Context = mongoose.model('Expression_Context');
var ComicBook = mongoose.model('ComicBook');
var fs = require("fs");
var fs_extra = require('fs.extra');





module.exports.get_comic_expressionData=function(req,res){

	var bodyp=req.body.var1
console.log('Data ======'+JSON.stringify(bodyp));
	var qury=[];
var stringTxt=[];  //if not expression
	for(i=0 ;i<bodyp.length;i++){


	if(bodyp[i].ExpID!='' && bodyp[i].ExpID!=undefined){
		qury.push({"_id":bodyp[i].ExpID})
	}

	if((bodyp[i].expstring!="" && bodyp[i].expstring!=null && bodyp[i].expstring!=undefined)){

		stringTxt.push({"name":bodyp[i].expstring})
	};
	
		
}
console.log('qury ======'+JSON.stringify(stringTxt));
//ExpID":"5af943300b6f1622ce15260d","ContextID"
	Expression.find({$or:qury},{_id:1 ,name:1},function(err,datac){
		if(err){
			res.json({'data':"error"});
		}
		else{
	
			//res.json(datac);
			for(i=0 ;i<stringTxt.length;i++){
				datac.push(stringTxt[i]);
			}
			
			res.json(datac);
		}
	
	})
		


};

module.exports.addComic=function(req,res){

	console.log(req.files);
	console.log(req.body);
	
	// var comic = new ComicBook();
	// comic.title = req.body.comic_title;
	// comic.plan = req.body.comic_plan;
	// comic.panel_data.title = req.body.title;
	// comic.panel_data.serial_no
	
   
	// comic.save(function(err,docsId){
	// 	if(err) 
	// 	res.json(err);
	// 	if(!err){
    //             res.status(200);
    //             res.json({
    //             "token" : "Comic Book Inserted Successfully ...."
    //             });
    //         }

	// });
	

};

module.exports.getComic=function(req,res){

		ComicBook.find({},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})


};


module.exports.getComicByID=function(req,res){

		ComicBook.find({_id:req.params.comicID},function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{
			
				res.json(datac);
			}
			
		})
		


};


module.exports.DeleteComicByID=function(req,res){
		ComicBook.remove({_id:req.params.comicID},function(err,dta){
			if(err)
				res.json(err);
			else
				res.json('Comic Book Deleted successfully');

		})

};

module.exports.EditComic=function(req,res){

	ComicBook.update({_id:req.params.comicID},req.body,{multi:true},function(err,dta){
			if(err)
				res.json(err);
			else

				res.json('Comic Book Updated successfully');

		})


};


module.exports.getComicbyExpID=function(req,res){

	ComicBook.aggregate(
		[
			{ "$match": { "panel_data.exp_data.ExpID":mongoose.Types.ObjectId(req.params.expID)} },
			{ "$sort": { "date": -1 } },

			{
				$lookup:{
				 from:"expressions",
				 localField:"panel_data.exp_data.ExpID",
				 foreignField:"_id",
				 as:'expression_data'
				}
			},
			{ "$unwind": "$expression_data" }


		],function(err,datac){
			if(err){
				res.json({'data':"error"});
			}
			else{

				res.json(datac);
			}

		})



		/*	ComicBook.find({ 'panel_data.exp_data': { $elemMatch: {'ExpID': req.params.expID} } } ,function(err,datac){
				if(err){
					res.json({'data':"error"});
				}
				else{
				
					res.json(datac);
				}
				
			})
		*/

};

module.exports.testImg = function(req, res)
{
	console.log(req.body);

	fs.writeFile('image.jpg', req.body.image, {encoding: 'base64'}, function(err) {
		console.log('File Created');
	});
}








