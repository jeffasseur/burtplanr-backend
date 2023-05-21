const Project = require('./../models/Project');

// index
const index = async (req, res) => {
    const projects = await Project.find();

    let response = {
        status: "success",
        data: projects,
    }
    res.json(response);
};

const getProjectById = async (req, res) => {
    let id = req.params.id;
    console.log(id);

    const project = await Project.findById(id);

    let response = {
        status: "success",
        message: project,
    }
    res.json(response);
}

const addProject = async (req, res) => {
    let project = new Project();

    project.title = req.body.title;
    project.description = req.body.description;
    project.dateOfStart = req.body.dateOfStart;
    project.dateOfCreation = req.body.dateOfCreation;
    project.dateOfPublication = req.body.dateOfPublication;
    project.dateOfStartCocreation = req.body.dateOfStartCocreation;
    project.dateOfEndCocreation = req.body.dateOfEndCocreation;
    project.dateOfStartVote = req.body.dateOfStartVote;
    project.dateOfEndVote = req.body.dateOfEndVote;
    project.budget = req.body.budget;
    project.banner = req.body.banner;
    project.informatie = req.body.informatie;
    project.document = req.body.document;
    project.dateOfEnd = req.body.dateOfEnd;
    project.location.postalcode = req.body.location.postalcode;
    project.location.city = req.body.location.city;
    project.location.street = req.body.location.street;
    project.location.coordinates.lat = req.body.location.coordinates.lat;
    project.location.coordinates.lng = req.body.location.coordinates.lng;
    project.location.coordinates.altitude = req.body.location.coordinates.altitude;
    project.border = req.body.border;
    project.fase = req.body.fase;
    project.projectData.type = req.body.projectData.type;
    project.projectData.file = req.body.projectData.file;
    project.projectData.description = req.body.projectData.description;
    project.projectData.link = req.body.projectData.link;

    await project.save();

    let response = {
        status: "success",
        message: "Project added.",
        devMessage: project,
    }
    res.json(response);
}

const updateProjectById = async (req, res) => {
    let id = req.params.id;
    let update = req.body;

    let project = await Project.findByIdAndUpdate(id, update);

    let response = {
        status: "success",
        message: "Project is updated.",
        project: project
    }
    res.json(response);
}

const deleteProject = async (req, res) => {
    const id = req.params.id;

    let softDelete = {
        delete: {
            isDeleted: true,
            whenDeleted: Date.now()
        },
    }

    const project = await Project.findByIdAndUpdate(id, softDelete, { returnDocument: 'after' });

    let response = {
        status: "success",
        message: "Project is deleted",
        project: project
    }
    res.json(response);
}

module.exports.index = index;
module.exports.addProject = addProject;
module.exports.getProjectById = getProjectById;
module.exports.updateProjectById = updateProjectById;
module.exports.deleteProject = deleteProject;