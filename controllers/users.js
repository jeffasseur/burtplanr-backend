const Burger = require('./../models/Burger');
const bcrypt = require('bcrypt');

const index = (req, res) => {
    res.send('respond with a resource');
};

const login = (req, res) => {
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

    //password handling
    if (req.body.password === req.body.passwordConfirm) {
        burger.password = req.body.password

        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        //set user password to hashed password
        burger.password = await bcrypt.hash(user.password, salt);

        //save user
        burger.save();
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
module.exports.login = login;
module.exports.register = register;