const Burger = require('./../models/Burger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = async (req, res) => {
    const burgers = await Burger.find();

    let response = {
        status: "success",
        data: burgers,
    }
    res.json(response);
};

const getBurgerById = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }

        console.log(user);

        try {
            const burger = await Burger.findById(user.id);

            let response = {
                status: "success",
                data: burger
            }
            res.json(response);
        } catch (error) {
            res.json({
                status: 'error',
                message: 'Je hebt geen toegang.'
            });
        }
    });
}

const login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        if (req.headers.authorization) {
            let response = {
                status: "error",
                message: "U bent al ingelogd.",
                session: req.session
            }
            res.json(response);
        }

        const burger = await Burger.findOne({ email: email });

        if (burger) {
            bcrypt.compare(password, burger.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ id: burger._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
                    let response = {
                        status: "success",
                        data: burger,
                        token: token,
                    }
                    console.log(response);
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

    //password handling
    if (req.body.password === req.body.passwordConfirm) {


        const password = req.body.password

        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        //set user password to hashed password
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const burger = await Burger.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            postalcode: req.body.postalcode,
            city: req.body.city,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            password: hashedPassword,
            image: '/img/square.png',
            dateOfRegistration: Date.now()
        });

        let response = {
            status: "success",
            data: burger,
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

// delete user

// update user

// wachtwoord wijzigen
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.json({
            status: 'error',
            message: 'Vul alle velden in.'
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.json({
            status: 'error',
            message: 'Je bent niet ingelogd.'
        });
    }

    try {
        const burger = await Burger.findById(decoded._id);

        bcrypt.compare(oldPassword, burger.password, async (err, match) => {
            if (err) {
                return res.json({
                    status: 'error',
                    message: 'Wachwoorden komen niet overeen.'
                });
            }

            if (match) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                burger = await Burger.findByIdAndUpdate(decoded._id, { password: hashedPassword }, { new: true });

                return res.json({
                    status: 'success',
                    data: burger,
                    message: 'Wachtwoord is gewijzigd.'
                });
            }
        });
    }
    catch (error) {
        return res.json({
            status: 'error',
            message: 'Er is iets misgelopen.'
        });
    }
};

module.exports.index = index;
module.exports.getBurgerById = getBurgerById;
module.exports.login = login;
module.exports.logout = logout;
module.exports.register = register;
module.exports.changePassword = changePassword;
