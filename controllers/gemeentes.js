const Gemeente = require('./../models/Gemeente');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    let nameInput = req.body.name;
    let passwordInput = req.body.password;

    let gemeente = await Gemeente.findOne({name: nameInput});
    if ( gemeente ) {
        const validatePassword = await bcrypt.compare( passwordInput, gemeente.password );
        if ( validatePassword ) {
            let response = {
                status: "success",
                message: "Je bent ingelogd",
                admin: true
            }
            res.json(response);
        } else {
            let response = {
                status: "error",
                message: "Inloggen mislukt",
                admin: false
            }
            res.json(response);
        }
    } else {
        let response = {
            status: "error",
            message: "inloggen mislukt",
            admin: false
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