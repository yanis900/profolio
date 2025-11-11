const { default: mongoose } = require("mongoose");
const User = require("../models/user");

async function createProject(req, res) {
  const userId = req.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const links = req.body.links;
  const tags = req.body.tags || [];
  const states = req.body.states || "In Progress";

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        projects: {
          title,
          description,
          links: links,
          tags: tags,
          states: states,
        },
      },
      $set: { lastUpdated: Date.now() },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(201).json({
    project: user.projects[user.projects.length - 1],
    message: "Project created successfully!",
  });
}

async function deleteProject(req, res) {
  const userId = req.user_id;
  const projectId = req.params.id;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { projects: { _id: projectId } },
      $set: { lastUpdated: Date.now() },
    },

    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    project: user.projects,
    message: "Project deleted successfully!",
  });
}

async function editProject(req, res) {
  const userId = req.user_id;
  const { id: projectId } = req.params;
  const { title, description, links, tags, states } = req.body;

  const projectObjectId = mongoose.Types.ObjectId.isValid(projectId)
    ? new mongoose.Types.ObjectId(projectId)
    : projectId;

  const user = await User.findOneAndUpdate(
    { _id: userId, "projects._id": projectObjectId },
    {
      $set: {
        "projects.$.title": title,
        "projects.$.description": description,
        "projects.$.links": links,
        "projects.$.tags": tags || [],
        "projects.$.states": states || "In Progress",
        lastUpdated: Date.now(),
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    project: user.projects,
    message: "Project edited successfully!",
  });
}

async function getProjectByTags(req, res) {
  const tags = req.query.tags.split(",");
  const projects = await User.aggregate([
    { $match: { visibility: true } }, // only visible users
    { $unwind: "$projects" }, // flatten the projects array
    { $match: { "projects.tags": { $in: tags } } }, // keep only projects with tags
    {
      $project: {
        _id: 0,
        userId: "$_id",
        firstname: 1,
        lastname: 1,
        email: 1,
        project: "$projects",
      },
    },
  ]);
  if (projects.length === 0) {
    return res.status(404).json({ message: "No project found with this tag" });
  }

  res.status(200).json({ projects: projects });
}

const ProjectsController = {
  createProject,
  deleteProject,
  editProject,
  getProjectByTags,
};

module.exports = ProjectsController;
