var mongoose = require( 'mongoose' );


var expression=new mongoose.Schema({
    name:String,
    //exp_link:String,
	active_flag:{type:Boolean, default:1},
	flag_history:[{
	    date:{type:Date, default:Date.now},
	    flag:Boolean
	}],
	version:{type:Number,default:1},
	date:{type:Date, default:Date.now},
});


//exp ok


//context and context history change recommended exp  remove change


var expression_context=new mongoose.Schema({
    ExpID:{type:mongoose.Schema.Types.ObjectId, ref:'Expression'},
    //context_link:String,
    Meaning_ID:Number,
    version:{type:Number,default:1},
    active_flag:{type:Boolean, default:1},

   flag_history:[{
     date:{type:Date, default:Date.now},
     flag:Boolean
    }],

    date:{type:Date, default:Date.now},
    level:[{name:String}], //Level

    popularity:String,
    meaning:String,
    context:String,
    notes: String,
    HTM:String  , // How to memorize
    categories:[{text:String}],

    examples:[{text:String,link:String}],
    audio_link:String,
    tags:[String],
    futher_suggestion:String  
});



var expression_context_version_history=new mongoose.Schema({

    ExpID:{type:mongoose.Schema.Types.ObjectId, ref:'Expression'},
    ContextID:{type:mongoose.Schema.Types.ObjectId, ref:'Expression_Context'},
    Meaning_ID:Number,
    version:{type:Number,default:1},
    active_flag:{type:Boolean, default:1},

   flag_history:[{
     date:{type:Date, default:Date.now},
     flag:Boolean
    }],

    date:{type:Date, default:Date.now},
    level:[{name:String}], //Level

    popularity:String,
    meaning:String,
    context:String,
    notes: String,
    HTM:String  , // How to memorize
    categories:[{text:String}],

    examples:[{text:String,link:String}],
    audio_link:String,
    tags:[String],
});




var similar_exp=new mongoose.Schema({
   // ExpID: {type:mongoose.Schema.Types.ObjectId,ref:"Expression"},
    set_array:[{
        ExpID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression'},
        ContextID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression_Context'}

    }]

});


var opposite_exp=new mongoose.Schema({
    //ExpID: {type:mongoose.Schema.Types.ObjectId,ref:"Expression"},
    set_array:[{
        ExpID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression'},
        ContextID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression_Context'}

    }]

});


var recommended_exp=new mongoose.Schema({
    ExpID: {type:mongoose.Schema.Types.ObjectId,ref:"Expression"},
    ContextID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression_Context'},
   
    recommended:[{
        ExpID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression'},
        ContextID:{type:mongoose.Schema.Types.ObjectId,ref:'Expression_Context'}

    }]
  

});


var LikeExp=new mongoose.Schema({

    Obj_ID:{type:mongoose.Schema.Types.ObjectId},
    type:String,
    like:[{userID:{type:mongoose.Schema.Types.ObjectId,ref:"User"}}],
    dislike:[{userID:{type:mongoose.Schema.Types.ObjectId,ref:"User"}}]

});



/*
var NotificationSchema=new mongoose.Schema(
{
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, // Notification creator
    receiver: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}], // Ids of the receivers of the notification
    message: String, // any description of the notification message
    read_by:[{
     readerId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
     read_at: {type: Date, default: Date.now}
    }],
    created_at:{type: Date, default: Date.now},

});

mongoose.model('Notification', NotificationSchema);

*/
mongoose.model('Expression', expression);
mongoose.model('Expression_Context', expression_context);
mongoose.model('Exp_Context_VersionHistory', expression_context_version_history);
mongoose.model('SimilarExp', similar_exp);
mongoose.model('OppositeExp', opposite_exp);
mongoose.model('RecommendedExp', recommended_exp);
mongoose.model('LikeDislike', LikeExp);
