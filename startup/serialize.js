let passport = require('passport')

admin.users = {}

// Serialize
// This means we're reducing the user data to a single hash by which the user can be identified.
passport.serializeUser(function(request, user, done) {
	admin.users[user.id] = user
	done(null, user.id)
})