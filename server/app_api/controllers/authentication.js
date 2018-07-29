var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require("fs");
var fs_extra = require('fs.extra');
var nodemailer = require('nodemailer');
var qs = require('querystring')
var request = require('request');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

				

//module.exports.register = function(req, res) {
var register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }




  /*for check social start*/
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;	
  if(req.body.provider!=undefined)  //for Social login check
  {
		User.findOne({ email: req.body.email }, function (err, user) {
		  if (err) { return done(err); }
		  // Return if user not found in database
		  if (!user) {
				console.log("not found user");
				return reg(req, res,ip);	
			
		  }
		  else{
				console.log("USR Found");
				var dat=new Date();
				var updata={logindate:dat,ip_address:ip,login_type:req.body.provider};
				var FlagU={flg:false};
				User.update({_id:user._id},{$push:{login_time:updata}},{multi:true},function(err1,resdata){

					var token;
					token = user.generateJwt();
					res.status(200);
					res.json({
						"token" : token
					});
				
				})
				
					
				
				
			//return login(req, res);
			}
		  
		})

  
  }
  /*for check social END */
  else{	   

	return reg(req, res,ip);	
	}
  
  function reg(req,res,ip){
		

	  var user = new User();

	  user.name = req.body.name;
	  user.email = req.body.email;
	  user.provider = req.body.provider;	  

	  //user name generation 
		if(req.body.provider=='linkedin'){
			var nreEml=req.body.name.replace(' ','_')+":"+req.body.email;
		}
		else{
			var newe=req.body.email.split('@');
			var nreEml=newe[1].split('.')[0]+":"+newe[0];
		}
	
		user.UserName=nreEml;

		var dat=new Date();
	  
		
	
		var updata={logindate:dat,ip_address:ip,login_type:req.body.provider};	  
	
		user.login_time=updata;
	  	
	  if(req.body.provider==undefined){
			user.setPassword(req.body.password);	
			
		}
	  else{
			user.setPassword(req.body.uid)
			
		}
	  
	  console.log("INside"+req.body.email);
		user.save(function(err,docsId) {
			if (err) return console.log(err);
			var token;
			token = user.generateJwt();
			res.status(200);
			

			
			fs_extra.copy(__dirname+'/../../public/profile_pic/deafult.jpg',__dirname+'/../../public/profile_pic/'+docsId._id+'.jpg',function (err) {
			
					if (err) return console.error(err);
					
					res.json({
					"token" : token
					});
					
			});
		
	 
		
		});
  
  }

};

//module.exports.login = function(req, res) {
var login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

					
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

	
    // If a user is found
    if(user){
      token = user.generateJwt();     
      res.status(200);
	  var dat=new Date();
	  var updata={logindate:dat,ip_address:ip,login_type:'Local'};
	  User.update({_id:user._id},{$push:{login_time:updata}},{multi:true},function(err1,resdata){
		  res.json({
			"token" : token,		
			"id" : user._id,		
		  });	
	  
	  });
	  
    
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

function track_user(userid,loginType,ip){
	
	
}

/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
	
var Google_login=function(req, res) {	
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    //client_secret: 'uiw6cZTXmIdGTXOAfe_QQOBY',//local
    client_secret: 'Nz_QsjOKXjtilGON_nVVJskn', 
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
	request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
		var accessToken = token.access_token;
		var headers = { Authorization: 'Bearer ' + accessToken };

		// Step 2. Retrieve profile information about the current user.
		request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
		  if (profile.error) {
			return res.status(500).send({message: profile.error.message});
		  }
		  console.log(profile);
		  
		  var userDetails = {
				"name":profile.name,

				"email":profile.email,
				
				"uid":profile.sub,

				"provider":"google",

				"imageUrl":profile.picture

			}
			
			console.log("userDetails-----------------------"+JSON.stringify(userDetails));
		
			res.json(userDetails)
	  
	  
      
		});
	});
};





var LinkedIn_login=function(req, res) {
	  var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
	  var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
	  var params = {
		client_id:'86ud957v90rsea',  //server
		//client_secret: 'UCv91kpd3iTDf3VU', //local 
		client_secret: 'e7qzONoKv8fhOsNE', //server
		
		code: req.body.code,
		//client_id: req.body.clientId,
		
		redirect_uri: req.body.redirectUri,
		grant_type: 'authorization_code'
		
	  };

	// Step 1. Exchange authorization code for access token.
	request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {
		if (response.statusCode !== 200) {
		  return res.status(response.statusCode).send({ message: body.error_description });
		}
		var params = {
		  oauth2_access_token: body.access_token,
		  format: 'json'
		};

		// Step 2. Retrieve profile information about the current user.
		request.get({ url: peopleApiUrl, qs: params, json: true }, function(err, response, profile) {
			
			var userDetails = {
				"name":profile.firstName + ' ' + profile.lastName,

				//"email":profile.email,
				"email":profile.id,
				
				"uid":profile.id,

				"provider":"linkedin",

				"imageUrl":profile.pictureUrl

			}
		
		  console.log("userDetails-----------------------"+JSON.stringify(userDetails));
		
			res.json(userDetails)
		  
		});
	  });
};




var Twitter_login=function(req,res){

  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';

  // Part 1 of 2: Initial request from Satellizer.
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: 'D7nKMGctRvy6WY6grK4yb3BMU',
      consumer_secret: '3iCpwS0QVNNScPJ1af0KgkMpxlaPtYsg6nFQEfSJdPsoablXyM',
      callback: req.body.redirectUri
    };

    // Step 1. Obtain request token for the authorization popup.
    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      var oauthToken = qs.parse(body);

      // Step 2. Send OAuth token back to open the authorization screen.
      res.send(oauthToken);
    });
  } else {
    // Part 2 of 2: Second request after Authorize app is clicked.
    var accessTokenOauth = {
      consumer_key: 'D7nKMGctRvy6WY6grK4yb3BMU',
      consumer_secret: '3iCpwS0QVNNScPJ1af0KgkMpxlaPtYsg6nFQEfSJdPsoablXyM',
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };

    // Step 3. Exchange oauth token and oauth verifier for access token.
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

      accessToken = qs.parse(accessToken);

      var profileOauth = {
        consumer_key: 'D7nKMGctRvy6WY6grK4yb3BMU',
        consumer_secret: '3iCpwS0QVNNScPJ1af0KgkMpxlaPtYsg6nFQEfSJdPsoablXyM',
        token: accessToken.oauth_token,
        token_secret: accessToken.oauth_token_secret,
      };

      // Step 4. Retrieve user's profile information and email address.
      request.get({
        url: profileUrl,
        qs: { include_email: true },
        oauth: profileOauth,
        json: true
      }, function(err, response, profile) {
		  
		 //console.log("profile5555 is..."+JSON.stringify(profile));
		 // console.log("TOKEN  is..."+accessToken.oauth_token);
		  
		  var userProfile = JSON.parse(JSON.stringify(profile));
		  
		 // console.log("user profile name-------------"+userProfile.name);
		  
		  userDetails = {
					"name":userProfile.name,

					"email":userProfile.email,

					//"uid":userProfile.id, //we use screen_name In place ogf UID
					"uid":userProfile.screen_name,

					"provider":"twitter",

					"imageUrl":userProfile.profile_image_url_https,

					"token":accessToken.oauth_token
			}
		  
		
		  console.log("userDetails-----------------------"+JSON.stringify(userDetails));
		  
			//return register({body:userDetails}, res);	 
			res.json(userDetails)
        // Step 5a. Link user accounts.
      
      });
    });
  }
}

var email_exists=function(req ,res){
//checking id user Email ID already registred
		User.findOne({ email: req.body.email }, function (err, user) {
		  if (err) { return done(err); }
				// Return if user not found in database
		  if (!user) {
				res.json({
					"token" : 'not found'
				});			
		  }
		  else{
				var datamsg =req.body.email+" is already registered..";
				res.json({
					"token" : datamsg
				});
		  }
		})

		
};

module.exports = {
  login: login,
  register: register,
  Twitter_login: Twitter_login,
  email_exists: email_exists,
  LinkedIn_login: LinkedIn_login,
  Google_login: Google_login,
}



module.exports.fbcallback=function(req, res){
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
  
  console.log(JSON.stringify("FB resPoinse................."+res));
    res.redirect('/profile');
	
	
  var user = new User();

  /*
	newUser.fb.id    = profile.id; // set the users facebook id	                
	newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user	                
	newUser.fb.firstName  = profile.name.givenName;
	newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	newUser.fb.email = profile.emails[0].value; 
  
  user.name = req.body.name;
  user.email = req.body.email;
  

   var dat=new Date();
  var updata={logindate:dat};
  user.login_time=updata;
  
  user.setPassword(req.body.password);

  user.save(function(err,docsId) {
    var token;
    token = user.generateJwt();
    res.status(200);
	if (err) return console.error(err);
	
	fs_extra.copy(__dirname+'/../../public/profile_pic/deafult.jpg',__dirname+'/../../public/profile_pic/'+docsId._id+'.jpg',function (err) {
			if (err) return console.error(err);
			res.json({
			"token" : token
			});
			
	});
	
 
	
  });
	
	
	
	*/
	
	
	
	
	
  }
};

module.exports.fblogin=function(req, res){

 passport.authenticate('facebook'),
  function(req, res){
		
  }

};
