const Burger = require('../models/Burger');
const { dbSecretFields } = require('./../configs');


const loginRequired = async (req, res, next) => {
    if (!req.session.authenticated || !req.session.burger) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }
    req.burger = await Burger.findById(req.session.burger.id);
    if (!req.burger) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }
    next();
}

const profile = async (req, res) => {
    res.json({ burger: _.omit(req.burger.toObject(), dbSecretFields) });
};

// Auth for admin
const adminRequired = async (req, res, next) => {
    if (!req.session.authenticated || !req.session.gemeente) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }
    req.gemeente = await Gemeente.findById(req.session.gemeente.id);
    if (!req.gemeente) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }
    next();
};

module.exports.loginRequired = loginRequired;
module.exports.profile = profile;
module.exports.adminRequired = adminRequired;