const Gemeente = require('./../models/Gemeente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    let emailInput = req.body.email;
    let postalcodeInput = req.body.postalcode;
    let passwordInput = req.body.password;

    let gemeente = await Gemeente.findOne({ email: emailInput });
    if (gemeente && gemeente.postalcode == postalcodeInput) {
        const validatePassword = await bcrypt.compare(passwordInput, gemeente.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: gemeente.email, postalcode: gemeente.postalcode }, process.env.JWT_SECRET, { expiresIn: "4h" });
                let response = {
                    status: "success",
                    message: gemeente,
                    gemeente: true,
                    token: token
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

module.exports.login = login;
module.exports.register = register;