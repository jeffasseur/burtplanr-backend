const Burger = require('../models/Burger');
const Gemeente = require('../models/Gemeente');
const jwt = require('jsonwebtoken');


const loginRequired = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }

        Burger.findOne({ _id: decoded.id }, (err, burger) => {
            if (err || !burger) {
                return res.json({
                    status: 'error',
                    message: 'Je hebt geen toegang.'
                });
            }
        });
    });

    next();
}

// Auth for admin
const adminRequired = (req, res, next) => {
    if (!req.header.authorization) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    Gemeente.findById(req.session.gemeente.id);
    if (!req.gemeente) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    next();
};

module.exports.loginRequired = loginRequired;
module.exports.adminRequired = adminRequired;