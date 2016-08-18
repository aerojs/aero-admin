let session = require('express-session')
let passport = require('passport')

const options = {
	name: 'sid',
	secret: require('crypto').randomBytes(64).toString('hex'),
	saveUninitialized: false,
	resave: false,
	cookie: {
		secure: true,
		maxAge: 6 * 30 * 24 * 60 * 60 * 1000
	}
}

admin.use(
	session(options),
	passport.initialize(),
	passport.session()
)

admin.get('logout', (request, response) => {
    request.logout()
    response.redirect('/')
})