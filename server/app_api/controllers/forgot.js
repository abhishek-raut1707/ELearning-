var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');
/*
const msg = {
  to: 'mahendra@mrsc.in',
  from: 'no-reply@ninaye.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

*/

module.exports.forgot=function(req,res){
	
var uemail=req.body.email;
	 var user12 = new User();
	User.findOne({ email: uemail }, function (err, user1) {
			  if (err) { res.json({"token" : "error"+err});	 }
			  // Return if user not found in database
			  if (!user1) {
					res.json({"token" :err});	
			  }			
			else{
					var token;
					token = user12.generateJwt();
					User.update({ email: uemail},{$set:{resetPasswordToken:token}},function(erp,rsdd){
							if (erp) { res.json({"token" : "error"+erp});	 }
							// Return if user not found in database
							if (!rsdd) {
							res.json({"token" : err});	
							}
							
							/*
							var smtpTransport = nodemailer.createTransport( {
							service: 'Gmail',
							auth: {
							  user: 'mahendra@mrsc.in',
							  pass: '#############'
							}
							});
							var mailOptions = {
							to: uemail,
							from: 'mahendra@mrsc.in',
							subject: 'Diplomme Password Reset',
							text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
							  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
							  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
							  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
							};
							
							smtpTransport.sendMail(mailOptions, function(err) {
							if(err){
								  console.log("MAIL ERROR"+err);
							}
							res.json({"token" : user1});
							});
							
							
							*/
							
							var mailOptions = {
							to: uemail,
							from: 'no-reply@ninaye.com',
							subject: 'Ninaye Password Reset',
							text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
							  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
							  req.protocol + req.headers.host + '/reset/' + token + '\n\n' +
							  'If you did not request this, please ignore this email and your password will remain unchanged.\n',
							//html:''
							};
							
						
							sgMail.send(mailOptions);
							
							res.json({"token" : user1});
							
					
					});
							
				}
		
			});
	

	
};
module.exports.reset=function(req,res){
	var user=new User();
	
	var pass=req.body.password;
	
	
	var uemail=req.body.email;
	
	user.setPassword(pass);

	
	console.log(uemail+"new/"+user.hash);
	
	User.findOne({resetPasswordToken:uemail},function(err,usdata){
		if(err){
				res.json({"tak":err});
		}
		if(!usdata){
			res.json({"tak":"user not found"+usdata});
		}
		else{	
			User.update({resetPasswordToken:uemail},{$set:{hash:user.hash,salt:user.salt,resetPasswordToken:""}},{multi:true},function(err1,resdat){
				if(err1){
					  res.status(404).json(err1);
						return;
				}
				if(!resdat){
					console.log("not data updated "+resdat);
					res.json({"tak":resdat});
				}
				
				//user. = undefined;
				res.json({"tak":'data updated'});
				console.log("data updated ");
				
			});
		}
	
	});


};
