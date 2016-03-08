/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


// expose our config directly to our application using module.exports
module.exports = function (routes) {
    //==================================================
    // Handle 404
    routes.use(function (req, res) {
        res.status(400);
        res.render('404', { title: '404: File Not Found' });
    });
    //==================================================
    // Handle 500
    routes.use(function (error, req, res, next) {
        res.status(500);
        res.render('500', { title: '500: Internal Server Error', error: error });
    });
};
