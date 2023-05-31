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

    const project = await Project.findById(id);

    if( project ) {
        let response = {
            status: "success",
            data: project,
        }
        res.status(200).json(response);
    } else {
        let response = {
            status: "error",
            message: "Project niet gevonden."
        }
        res.status(400).json(response);
    }
}

const addProject = async (req, res) => {
    
    const project = await Project.create( req.body );

    if( project ) {
        let response = {
            status: "success",
            message: "Project is succesvol toegevoegd.",
            data: project
        }
        res.json(response);
    } else {
        let response = {
            status: "error",
            message: "Project toevoegen is mislukt."
        }
        res.json(response);
    }
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