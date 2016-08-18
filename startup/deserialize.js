let passport = require('passport')

// Deserialize
// This means a web page is requesting full user data by some kind of hash.
passport.deserializeUser(function(googleId, done) {
	done(undefined, admin.users[googleId])
})