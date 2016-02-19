var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');
var environment = args.env || "development";
var common_config = {
    name: "Sandbox API server",
    version: "0.0.1",
    SECRET: 'secret',
    KEY: 'express.sid',
    bdatabasesession: true,
    benable_facebook: false,
    'facebookAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': 'http://127.0.0.1:8080/auth/facebook/callback'
    },
    benable_twitter: false,
    'twitterAuth': {
        'consumerKey': '',
        'consumerSecret': '',
        'callbackURL': 'http://127.0.0.1:8080/auth/twitter/callback'
    },
    benable_google: false,
    'googleAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': 'http://127.0.0.1:8080/auth/google/callback'
    },
    environment: environment,
    database: 'mongodb://127.0.0.1/mmo',
    databasetype: "mongodb",
    cachetime: (365 * 24 * 60 * 60 * 1000)
};
var conf = {
    production: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8080,
        mode: "production",
        benablemodules: true
    },
    development: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8080,
        mode: "development",
        benablemodules: true
    },
    alpha: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8080,
        mode: "alpha",
        benablemodules: true
    }
};
extend(false, conf.production, common_config);
extend(false, conf.development, common_config);
extend(false, conf.alpha, common_config);
module.exports = config = conf[environment];
