const Burger = require('./../models/Burger');
const bcrypt = require('bcrypt');

const index = async (req, res) => {
    const burgers = await Burger.find();

    let response = {
        status: "success",
        data: burgers,
    }
    res.json(response);
};

const login = async (req, res) => {
    console.log(req.sessionID)

    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        const burger = await Burger.findOne({ email: email });

        if (burger) {
            bcrypt.compare(password, burger.password, (err, result) => {
                if (result) {
                    req.session.authenticated = true;
                    req.session.burger = {
                        id: burger._id,
                        firstname: burger.firstname,
                        email: burger.email,
                        postalcode: burger.postalcode,
                    };
                    let response = {
                        status: "success",
                        message: burger,
                        session: req.session
                    }
                    res.json(response);
                }
                else {
                    let response = {
                        status: "error",
                        message: "De combinatie van email en wachtwoord is onjuist."
                    }
                    res.json(response);
                }
            });
        }
        else {
            let response = {
                status: "error",
                message: "De combinatie van email en wachtwoord is onjuist."
            }
            res.json(response);
        }
    }
    else {
        let response = {
            status: "error",
            message: "Vul alle velden in."
        }
        res.json(response);
    }
};

const register = async (req, res) => {
    if (await Burger.findOne({ email: req.body.email })) {
        let response = {
            status: "error",
            message: "Dit emailadres is al in gebruik."
        }
        res.json(response);
    }

    let burger = new Burger();

    burger.firstname = req.body.firstname;
    burger.lastname = req.body.lastname;
    burger.email = req.body.email;
    burger.postalcode = req.body.postalcode;
    burger.city = req.body.city;
    burger.street = req.body.street;
    burger.houseNumber = req.body.houseNumber;
    burger.dateOfRegistration = Date.now();

    //password handling
    if (req.body.password === req.body.passwordConfirm) {

        burger.password = req.body.password

        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        //set user password to hashed password
        burger.password = await bcrypt.hash(burger.password, salt);

        //save user
        await burger.save();

        let response = {
            status: "success",
            message: burger,
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

const logout = async (req, res) => {
    delete req.session.burger;
    req.session.authenticated = false;

    let response = {
        status: "success",
        message: "U bent uitgelogd."
    }
    res.json(response);
};

module.exports.index = index;
module.exports.login = login;
module.exports.register = register;
module.exports.logout = logout;