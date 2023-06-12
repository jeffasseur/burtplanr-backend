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
            } else {
                return res.json({
                    status: 'error',
                    message: 'Je hebt geen toegang.'
                });
            }

        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }
    });

}

// Auth for admin
// const adminRequired = (req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.json({
//             status: 'error',
//             message: 'Je bent niet ingelogd.'
//         });
//     }

//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//         return res.json({
//             status: 'error',
//             message: 'Je hebt geen toegang.'
//         });
//     }

//     Gemeente.findOne({ _id: decoded.id }, (err, gemeente) => {
//         if (err || !gemeente) {
//             return res.json({
//                 status: 'error',
//                 message: 'Je hebt geen toegang.'
//             });
//         }
//     });

//     next();
// };

module.exports.loginRequired = loginRequired;
// module.exports.adminRequired = adminRequired;