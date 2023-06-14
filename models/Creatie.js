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
        creation: [{
            latlng: {
                x: { type: Number, required: true },
                y: { type: Number, required: true },
                z: { type: Number, required: true },
            },
            modelName: { type: String, required: true },
        }],
        dateOfCreation: { type: Date },
        votes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Burger'
            }
        ],
    }
);

const Creatie = mongoose.model('Creatie', CreatieSchema);

module.exports = Creatie;