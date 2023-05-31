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

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.send('respond with a resource');
};

const register = async (req, res) => {
    // res.send('respond with a resource');

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

module.exports.index = index;
// module.exports.login = login;
module.exports.register = register;