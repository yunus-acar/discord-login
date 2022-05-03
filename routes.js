var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
module.exports = function (app, passport) {
	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', { user: req.user });
	});



	app.get('/auth/discord', passport.authenticate('discord', {
		scope: scopes
	}));

	app.get('/auth/discord/callback', passport.authenticate('discord', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

	app.get('/connect/discord', passport.authorize('discord', { scope: scopes }))


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}