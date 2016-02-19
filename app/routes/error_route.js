module.exports = function (routes) {
    routes.use(function (req, res) {
        res.status(400);
        res.render('404', { title: '404: File Not Found' });
    });
    routes.use(function (error, req, res, next) {
        res.status(500);
        res.render('500', { title: '500: Internal Server Error', error: error });
    });
};
