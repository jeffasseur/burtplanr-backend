const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuurtplanrSchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: false },
    link: { type: String, required: false },
    logo: { type: String, required: false },
});

const Buurtplanr = mongoose.model('Buurtplanr', BuurtplanrSchema);

module.exports = Buurtplanr;