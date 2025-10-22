const User = require("../models/user");

async function createProject(req, res) {
    const userId = req.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const links = req.body.links

    const user = await User.findByIdAndUpdate(
        userId, 
        { $push: { projects: { title, description, links: links} } }, 
        { new: true } )

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    console.log(user.projects)
    res.status(201).json({
        project: user.projects[user.projects.length -1], message: "Project created successfully!"
    });
}

async function deleteProject(req, res) {
    const userId = req.user_id;
    const projectId = req.params.id

    const user = await User.findByIdAndUpdate(
        userId, 
        { $pull: { projects: { _id: projectId } } }, 
        { new: true } )

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    console.log(user.projects)
    res.status(200).json({
        project: user.projects, message: "Project deleted successfully!"
    });
}

async function editProject(req, res) {
    const userId = req.user_id;
    const projectId = req.params.id
    const title = req.body.title;
    const description = req.body.description;
    const links = req.body.links

    const user = await User.findByIdAndUpdate(
        {userId, "projects._id": projectId },
        {
                $set: {
                    "projects.$.title": title,
                    "projects.$.description": description,
                    "projects.$.links": links
                }
            },
        { new: true } )

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    console.log(user.projects)
    res.status(200).json({
        project: user.projects, message: "Project edited successfully!"
    });
}

const ProjectsController = {
    createProject: createProject,
    deleteProject: deleteProject,
    editProject: editProject,
};

module.exports = ProjectsController;