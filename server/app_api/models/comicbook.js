var mongoose = require( 'mongoose' );


var comicbook=new mongoose.Schema({
	title:String,
	plan:[{name:String}],
	panel_data: [{
		serial_no:Number,
		img_url:String,
		image:String, 
		alt :String,
		title:String,
		exp_data:[{
			expstring:String,
			ExpID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression'},
			ContextID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression_Context'}
		}],
		description:String
	}],	
	active_flag:{type:Boolean, default:1},
	date:{type:Date, default:Date.now}
});


mongoose.model('ComicBook', comicbook);

