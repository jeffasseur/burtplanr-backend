const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatieSchema = new mongoose.Schema({
    id: Number,
    projec_id: Number,
    user_id: Number,
    creation: [
        {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
            modeltype: { type: String, required: true },
        },
    ],
    modelTypes: { type: Array, required: true },

});

const Creatie = mongoose.model('Creatie', CreatieSchema);

module.exports = Creatie;