const Project = require('./../models/Project');

const index = (req, res) => {
    res.send('respond with all the projects');
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
    project.dateOfEnd = req.body.dateOfEnd;
    project.location = req.body.location;
    // project.border = req.body.border;

    await project.save();

    let response = {
        status: "success",
        message: "Project added.",
        devMessage: project,
    }
    res.json(response);
}

module.exports.index = index;
module.exports.addProject = addProject;
module.exports.getProjectById = getProjectById;