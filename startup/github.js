let passport = require('passport')
let GitHubStrategy = require('passport-github').Strategy

const githubConfig = {
    callbackURL: admin.production ? `${admin.server.protocol}://${admin.site.config.domain}:${admin.config.ports.https}/auth/github/callback` : '/auth/github/callback',
	passReqToCallback: true,
	clientID: admin.site.api.admin.github.id,
	clientSecret: admin.site.api.admin.github.secret
}

passport.use(new GitHubStrategy(
    githubConfig,
    function(request, accessToken, refreshToken, profile, done) {
		let github = profile._json
		let email = github.email || ''

		if(email.endsWith('googlemail.com'))
			email = email.replace('googlemail.com', 'gmail.com')

		if(admin.site.config.admin.emails.indexOf(email) === -1) {
			done(undefined, false)
			return
		}

		// New user
		let user = {
			id: github.id,
			nick: github.login,
			name: github.name || '',
			email
		}

		done(undefined, user)
    }
))

// GitHub login
admin.get('/auth/github', passport.authenticate('github'))

// GitHub callback
admin.get('/auth/github/callback',
    passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/'
    })
)