/*
	Project Name: Node Web Sandbox
	Link:https://bitbucket.org/Lightnet/nodewebsandbox
	
	Information: To create a bot and rpg system with the module plug-in build prototype.
	Currently work in progress builds.
	
	Notes: Working toward multiple builds to keep simple and stable to run host server.
	
	Please read the readme.txt file for more information.
	
*/

// expose our config directly to our application using module.exports
module.exports = function(routes){
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