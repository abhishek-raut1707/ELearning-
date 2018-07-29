var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
    type: String,
        unique: true,
        required: true
    },
    UserName:{
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    PhoneNo: Number,
    CountryCode: String,
    city: String,
    plan: String,

    plan_history:[{
        date:{type:Date, default:Date.now},
        plan:String
    }],

    provider: String,
    party:{type:Boolean,default:false},

    img:String,
    active:{type:Boolean,default:true},

    hash: String,
    salt: String,
    login_time:[{logindate:Date,ip_address:String,login_type:String}],
    resetPasswordToken:String
});




var bookmarkExp=new mongoose.Schema({
	userID:{   
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User' 
	},
    ExpID:{type:mongoose.Schema.Types.ObjectId, ref:'Expression'}
});


var blacklistedExp=new mongoose.Schema({
	userID:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
	},
    ExpID:{type:mongoose.Schema.Types.ObjectId, ref:'Expression'}
});



/*for node v8*/

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password,this.salt, 1000, 64,'sha512').toString('hex');  
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
  return this.hash === hash;
};



/*for node v8*/

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    img: this.img,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};




mongoose.model('User', userSchema);
mongoose.model('BookmarkExp', bookmarkExp);
mongoose.model('BlacklistedExp', blacklistedExp);

