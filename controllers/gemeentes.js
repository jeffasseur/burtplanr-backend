const Gemeente = require('./../models/Gemeente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const emailInput = req.body.email;
    const postalcodeInput = req.body.postalcode;
    const passwordInput = req.body.password;

    const gemeente = await Gemeente.findOne({ email: emailInput });
    if (gemeente && gemeente.postalcode == postalcodeInput) {
        const validatePassword = await bcrypt.compare(passwordInput, gemeente.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: gemeente._id, admin: true }, process.env.JWT_SECRET, { expiresIn: '4h' });
                let response = {
                    status: "success",
                    message: gemeente,
                    token: token,
                }
                res.json(response);
            } else if (err) {
                res.json(err);
            } else {
                let response = {
                    status: "error",
                    message: "De combinatie van email en wachtwoord is onjuist."
                }
                res.json(response);
            }
        });
    } else {
        let response = {
            status: "error",
            message: "inloggen mislukt",
            gemeente: false
        }
        res.json(response);
    }
};

const register = async (req, res) => {

    const gemeente = new Gemeente();

    gemeente.name = req.body.name;
    gemeente.postalcode = req.body.postalcode;
    gemeente.city = req.body.city;
    gemeente.passcode = req.body.passcode;
    gemeente.email = req.body.email;
    gemeente.admin = true;

    //password handling
    if (req.body.password === req.body.passwordConfirm) {

        gemeente.password = req.body.password

        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        //set user password to hashed password
        gemeente.password = await bcrypt.hash(gemeente.password, salt);

        //save user
        await gemeente.save();

        let response = {
            status: "success",
            message: gemeente,
        }
        res.json(response);
    }
    else {
        let response = {
            status: "error",
            message: "De wachtwoorden komen niet overeen."
        }
        res.json(response);
    }
};

const logout = (req, res) => {
    delete req.session.gemeente;
    req.session.authenticated = false;
    req.session.destroy();
    res.json({
        status: 'success',
        message: 'Je bent uitgelogd.'
    });
};

module.exports.login = login;
module.exports.register = register;
module.exports.logout = logout;