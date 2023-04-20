const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BurgerSchema = new mongoose.Schema({
    id: Number,
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordConfirm: { type: String, required: true },
    postalcode: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, nullable },
    houseNumber: { type: String, nullable },
});

const Burger = mongoose.model('Burger', BurgerSchema);

module.exports = Burger;