const Creatie = require('./../models/Creatie');

// index
const index = async (req, res) => {
    const creaties = await Creatie
        .find()
        .populate('project')
        .populate('burger');

    if (creaties) {
        let response = {
            status: "success",
            data: creaties,
        }
        res.json(response);
    } else {
        let response = {
            status: "error",
            message: "Er zijn geen creaties gevonden."
        }
        res.json(response);
    }
};

// get creation by id
const getCreationById = async (req, res) => {
    const creatie = await Creatie.findOne(req.params.id).populate(['burger', 'project']);

    if (creatie) {
        let response = {
            status: "success",
            message: creatie
        }
        res.json(response);
    }
    else {
        let response = {
            status: "error",
            message: "Geen creatie gevonden."
        }
        res.json(response);
    }
}

const getCreationByProjectIdAndBurgerId = async (req, res) => {
    const creatie = await Creatie.findOne({ 'burger': req.params.burgerId, 'project': req.params.projectId }).populate(['burger', 'project']);

    if (creatie) {
        let response = {
            status: "success",
            data: creatie
        }
        res.json(response);
    }
    else {
        let response = {
            status: "error",
            message: "Geen creatie gevonden."
        }
        res.json(response);
    }
}

// add creation to project
const addCreation = async (req, res) => {
    req.body.project = req.params.projectId;
    req.body.burger = req.params.burgerId;
    req.body.dateOfCreation = Date.now();

    const creatie = await Creatie.create(req.body);

    if (creatie) {
        let response = {
            status: "success",
            data: creatie,
        }
        res.json(response);
    } else {
        let response = {
            status: "error",
            message: "Het toevoegen van een creatie is mislukt."
        }
        res.json(response);
    }

}

// update creatie by id
const updateCreationById = async (req, res) => {
    let id = req.params.id;
    let update = req.body;

    let creatie = await Creatie.findById(id).populate(['project', 'burger']);

    if (creatie) {
        creatie = await Creatie.findByIdAndUpdate(id, update, { new: true });
        let response = {
            status: "success",
            message: "Uw creatie is gewijzigd.",
            data: creatie
        }
        res.json(response);
    }
    else {
        let response = {
            status: "error",
            message: "Could not find this creation"
        }
        res.json(response);
    }

}

module.exports.index = index;
module.exports.getCreationById = getCreationById;
module.exports.getCreationByProjectIdAndBurgerId = getCreationByProjectIdAndBurgerId;
module.exports.addCreation = addCreation;
module.exports.updateCreationById = updateCreationById;