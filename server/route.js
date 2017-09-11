module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.send(['Jade', 'Edaj', 'Jaded']);
    });
}