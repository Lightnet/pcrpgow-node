/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


var express = require('express');
var passport = require('passport');
//var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
        if (req.user == null) {
          //res.render('home', { user: req.user });
          res.render('networkio', { user: req.user });
            /*
            res.render('index', { benable_facebook: config.benable_facebook,
                benable_twitter: config.benable_twitter,
                benable_google: config.benable_google });
            */
        }
        else {
            res.render('home', { user: req.user });
        }
    });
    // PROFILE SECTION =========================
    router.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            //user: req.user
            user: req.user,
            benable_facebook: config.benable_facebook,
            benable_twitter: config.benable_twitter,
            benable_google: config.benable_google
        });
    });
    // LOGOUT ==============================
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================
    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    router.get('/login', function (req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });
    /*
    routes.post('/login', function (req, res) {
        console.log(passport);
        res.render('login', { message: req.flash('loginMessage') });
    });
    */
    // process the login form
    /*
    routes.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
        console.log("login......");
        //res.redirect('/users/' + req.user.username);
        console.log("username:"+req.user.username);
        res.send('Hello World');
    });
    */
    router.post('/login', passport.authenticate('local-login', {
        //successRedirect : '/profile', // redirect to the secure profile section
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    /*
    routes.post('/login', passport.authenticate('local-login', {
        //successRedirect : '/profile', // redirect to the secure profile section
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),function(req, res) {
        console.log("login......");
    });
    */
    // SIGNUP =================================
    // show the signup form
    router.get('/register', function (req, res) {
        res.render('register.ejs', { message: req.flash('loginMessage') });
    });
    // process the signup form
    router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }), function (req, res) {
        console.log("sign up...");
        //res.redirect('/users/' + req.user.username);
        //console.log("username:"+req.user.username);
        //res.send('Hello World');
    });
    // facebook -------------------------------
    // send to facebook to do the authentication
    if (config.benable_facebook) {
        router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
        // handle the callback after facebook has authenticated the user
        router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            //successRedirect : '/profile',
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
    // twitter --------------------------------
    // send to twitter to do the authentication
    //app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
    if (config.benable_twitter) {
        router.get('/auth/twitter', passport.authenticate('twitter'));
        // handle the callback after twitter has authenticated the user
        router.get('/auth/twitter/callback', passport.authenticate('twitter', {
            //successRedirect : '/profile',
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
    // google ---------------------------------
    // send to google to do the authentication
    if (router.benable_google) {
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
        // the callback after google has authenticated the user
        router.get('/auth/google/callback', passport.authenticate('google', {
            //successRedirect : '/profile',
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================
    // locally --------------------------------
    router.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    router.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect/local',
        failureFlash: true
    }));
    // facebook -------------------------------
    // send to facebook to do the authentication
    if (config.benable_facebook) {
        router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
        // handle the callback after facebook has authorized the user
        router.get('/connect/facebook/callback', passport.authorize('facebook', {
            //successRedirect : '/profile',
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
    // twitter --------------------------------
    // send to twitter to do the authentication
    if (config.benable_twitter) {
        //app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
        router.get('/connect/twitter', passport.authorize('twitter'));
        // handle the callback after twitter has authorized the user
        router.get('/connect/twitter/callback', passport.authorize('twitter', {
            //successRedirect : '/profile',
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
    // google ---------------------------------
    // send to google to do the authentication
    if (config.benable_google) {
        router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));
        // the callback after google has authorized the user
        router.get('/connect/google/callback', passport.authorize('google', {
            //successRedirect : '/profile',
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future
    // local -----------------------------------
    router.get('/unlink/local', function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });
    // facebook -------------------------------
    if (config.benable_facebook) {
        router.get('/unlink/facebook', function (req, res) {
            var user = req.user;
            user.facebook.token = undefined;
            user.save(function (err) {
                res.redirect('/profile');
            });
        });
    }
    // twitter --------------------------------
    if (config.benable_twitter) {
        router.get('/unlink/twitter', function (req, res) {
            var user = req.user;
            user.twitter.token = undefined;
            user.save(function (err) {
                res.redirect('/profile');
            });
        });
    }
    // google ---------------------------------
    if (config.benable_google) {
        router.get('/unlink/google', function (req, res) {
            var user = req.user;
            user.google.token = undefined;
            user.save(function (err) {
                res.redirect('/profile');
            });
        });
    }


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
