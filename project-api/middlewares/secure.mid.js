const createError = require('http-errors');

//el usuario tiene que estar registrado para hacer cosas con los productos
module.exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        throw createError(403)
    }
}