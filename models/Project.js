const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateOfCreation: { type: Date, default: Date.now },
    dateOfStart: { type: Date, required: false },
    dateOfEnd: { type: Date, required: false },
    location: {
        postalcode: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, nullable },
    },
    border: {},
    fase: { type: String, default: "Wachten tot opstart ..." },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;