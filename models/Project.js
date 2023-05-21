const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Datum voor aanmaak project
    dateOfCreation: { type: Date, default: Date.now },
    // Datum voor publicatie project
    dateOfPublication: { type: String, required: true }, // change to type Date
    // Cocreatie
    dateOfStartCocreation: { type: String, required: true }, // change to type Date
    dateOfEndCocreation: { type: String, required: true }, // change to type Date
    // Stemmen
    dateOfStartVote: { type: String, required: true }, // change to type Date
    dateOfEndVote: { type: String, required: true }, // change to type Date
    budget: { type: Number, required: true },
    banner: { type: String, required: false },
    informatie: { type: String, required: true },
    document: { type: String, required: false },
    location: {
        postalcode: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
            altitude: { type: Number, required: true, default: 2 },
        },
    },
    border: {},
    fase: { type: String, default: "Wachten tot opstart" },
    /*
    *   Fase 0: Wachten tot opstart
    *   Fase 1: Informeren
    *   Fase 2: Cocreatie 
    *   Fase 3: Stemmen
    *   Fase 4: Vervolg
    */
    delete: {
        isDeleted: { type: Boolean, default: false },
        whenDeleted: { type: Date, default: null }
    },
    projectData: {
        type: { type: String, required: true },
        file: { type: String, required: false },
        description: { type: String, required: false },
        link: { type: String, required: false },
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;