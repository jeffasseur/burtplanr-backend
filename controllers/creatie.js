const Creatie = require('./../models/Creatie');

// index
const index = async (req, res) => {
    const creaties = await Creatie
        .find()
        .populate('project')
        .populate('burger');

    console.log(creaties);

    let response = {
        status: "success",
        data: creaties,
    }
    res.json(response);
};

// add creation to project
const addCreation = async (req, res) => {
    let projectId = req.params.projectId;
    let burgerId = req.params.burgerId;
    req.body.project = projectId;
    req.body.burger = burgerId; //644a6b16421b1f1c65e81c4a

    const creatie = new Creatie(req.body);
    await creatie.save();

    let response = {
        status: "success",
        data: creatie,
    }
    res.json(response);
}

// update creatie by id
const updateCreatieById = async (req, res) => {
    let id = req.params.id;
    let update = req.body;

    let creatie = await Creatie.findById(id).populate( ['project', 'burger'] );

    if ( creatie ) {
        creatie = await Creatie.findByIdAndUpdate(id, update, {new: true});
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
module.exports.addCreation = addCreation;
module.exports.updateCreatieById = updateCreatieById;