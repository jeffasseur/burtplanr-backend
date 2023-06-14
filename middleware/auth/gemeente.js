const Gemeente = require('./../../models/Gemeente');
const jwt = require('jsonwebtoken');

// Auth for admin
const adminRequired = (req, res, next) => {
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
            message: 'Je hebt geen toegang.'
        });
    }

    Gemeente.findOne({ _id: decoded.id }, (err, gemeente) => {
        if (err || !gemeente) {
            return res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }
    });

    next();
};

module.exports.adminRequired = adminRequired;
