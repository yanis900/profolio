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
        project: user.projects[user.projects.length -1], message:"Project created successfully!"
    });

}



const ProjectsController = {
    createProject: createProject,
//   getUserById: getUserById,
//   getUserBySlug: getUserBySlug
};

module.exports = ProjectsController;