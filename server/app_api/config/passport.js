var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
//var config = require('./app_api/config/oauth');

var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));




 passport.use('facebook', new FacebookStrategy(
       {
	 clientID: '125318911430822',
    clientSecret: '14ee7126b2c414bbdf70b35ee81a1b89',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
} ,

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	       // User.findOne({ 'id' : profile.id }, function(err, user) {	       
			User.findOne({ id: profile.id }, function (err, user) {
	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that facebook id, create them
	                var newUser = new User();

					// set all of the facebook information in our user model
	               newUser.id    = profile.id; // set the users facebook id	                
	               newUser.name    = profile.displayName; // set the users facebook name
					 newUser.email =profile.id+'fb@facebook.com';
					 
	                newUser.access_token = access_token; // we will save the token that facebook provides to the user	                
	             //   newUser.fb.firstName  = profile.name.givenName;
	             //   newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	              //  newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

					
					
					
					
					// save our user to the database
	                newUser.save(function(err) {
	                    if (err){
	                        console.log('Error in fb data save'+err)
							throw err;
							
						}
	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	               
	            }

	        });
        });

    }));
	

	
	passport.use(new TwitterStrategy(
       {
		consumerKey: "NPRvxqSgImmYJY76ZA9OjXF7J",
		consumerSecret: 'EErvMv53J3dQGoTJyCUe3cJ0Nb2ZMcXa75dJZMFxUsNjDIuIDw',
		callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
} ,

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	       // User.findOne({ 'id' : profile.id }, function(err, user) {	       
			User.findOne({ email: profile.id }, function (err, user) {
	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
	                return done(null, user); // user found, return that user
	            } else {
					var newUser = new User();

					// set all of the facebook information in our user model
	               newUser.id    = profile.id; // set the users facebook id	                
	               newUser.name    = profile.displayName; // set the users facebook name
					 newUser.email =profile.id+'fb@twitter.com';
					 
	                newUser.access_token = access_token; // we will save the token that facebook provides to the user	                
	             //   newUser.fb.firstName  = profile.name.givenName;
	             //   newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	              //  newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

					
					
					// save our user to the database
	                newUser.save(function(err) {
	                    if (err){
	                        console.log('Error in fb data save'+err)
							throw err;
							
						}
	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));
	

