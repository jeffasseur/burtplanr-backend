const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GemeenteSchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true },
    postalcode: { type: String, required: true },
    city: { type: String, required: true },
    passcode: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: true }
});

const Gemeente = mongoose.model('Gemeente', GemeenteSchema);

module.exports = Gemeente;