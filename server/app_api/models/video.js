var mongoose = require( 'mongoose' );


var video=new mongoose.Schema({
    title:String,
    link:String,
    categories:[{category:String}],
    sub_categories:[{sub_category:String}],
    ExpID:{type:mongoose.Schema.Types.ObjectId, ref:'Expression'},
    transcript:[{transcriptID:{type:mongoose.Schema.Types.ObjectId, ref:'Transcript'}}],

});

var transcript=new mongoose.Schema({
    videoID:{type:mongoose.Schema.Types.ObjectId, ref:'Video'},
    transcript:String,
    date:{type:Date,default:Date.now},
    version:Number

});




mongoose.model('Video', video);
mongoose.model('Transcript', transcript);
