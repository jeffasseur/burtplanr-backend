const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateOfCreation: { type: Date, default: Date.now },
    dateOfStart: { type: String, required: false }, // change to type Date
    dateOfEnd: { type: String, required: false }, // change to type Date
    location: {
        postalcode: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String },
    },
    border: {},
    fase: { type: String, default: "Wachten tot opstart ..." },
    delete: {
        isDeleted: { type: Boolean, default: false },
        whenDeleted: { type: Date, default: null }
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;