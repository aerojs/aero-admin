let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

let googleConfig = Object.assign({
        callbackURL: '/auth/google/callback',
		passReqToCallback: true
    },
	admin.site.apiKeys.admin.google
)

passport.use(new GoogleStrategy(
    googleConfig,
    function(request, accessToken, refreshToken, profile, done) {
		let google = profile._json
		let email = google.emails.length > 0 ? google.emails[0].value : ''

		if(email.endsWith('googlemail.com'))
			email = email.replace('googlemail.com', 'gmail.com')

		if(admin.site.config.admin.emails.indexOf(email) === -1) {
			done(undefined, false)
			return
		}

		// New user
		let user = {
			googleId: google.id,
			email
		}

		done(undefined, user)
    }
))

// Google login
admin.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'email'
    ]
}))

// Google callback
admin.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
    })
)