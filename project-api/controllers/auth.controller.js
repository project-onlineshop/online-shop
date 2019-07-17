const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.register = (req, res, next) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then(user => {
        if(user) throw createError(409, 'User already register')
        else return new User(req.body).save()
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, message) =>{
        if(error) next(error)
        else if (!user) throw createError(401, message)
        else {
            req.login(user, error => {
                if(error) next(error)
                else res.status(201).json(user)
            })
        }
    })(req, res, next);
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.status(204).json();
}

module.exports.getProfile = (req, res, next) => {
    res.json(req.user);
}

module.exports.toggleFavourite = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const { productId } = req.params
        const currentFav = user.favourites.map(x => x.toString())

        if (currentFav.includes(productId)) {
            user.favourites = user.favourites.filter(id => id.toString() !== productId)
        } else {
            user.favourites = [...user.favourites, productId]
        }

        await user.save()

        res.json({ favourites: user.favourites })
    } catch(error) {
        next(error)
    }
}

module.exports.editProfile = (req, res, next) => {
    delete req.body.email;

    const user = req.user;
    Object.keys(req.body).forEach(prop => user[prop] = req.body[prop]);
    if(req.file) user.image = req.file.secure_url;

    user.save()
        .then(user => res.status(201).json(user))
        .catch(next)
}