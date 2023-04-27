const Project = require('./../models/Project');

const index = (req, res) => {
    res.send('respond with all the projects');
};

const addProject = (req, res) => {
    let project = new Project();

    project.title = req.body.title;
    project.description = req.body.description;
}

module.exports.index = index;
module.exports.addProject = addProject;