const Burger = require('./../../models/Burger');
const jwt = require('jsonwebtoken');

const loginRequired = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }
    const jwtToken = req.headers.authorization.split(' ')[1];
    console.log(jwtToken)
    if (!jwtToken) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }

        try {
            const burger = Burger.findById(decoded);

            if (burger) {
                next();
            }
            else {
                return res.json({
                    status: 'error',
                    message: 'Je hebt geen toegang.'
                });
            }

        }
        catch (err) {
            return res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }
    });

}

module.exports.loginRequired = loginRequired;