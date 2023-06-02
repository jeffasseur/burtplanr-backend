const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatieSchema = new mongoose.Schema(
    {
        id: Number,
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        burger: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Burger'
        },
        creation: [
            {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true },
                modeltype: { type: String, required: true },
            },
        ],
        modelTypes: { type: Array || Object, required: true },
        dateOfCreation: { type: Date, required: true },
    }
);

const Creatie = mongoose.model('Creatie', CreatieSchema);

module.exports = Creatie;