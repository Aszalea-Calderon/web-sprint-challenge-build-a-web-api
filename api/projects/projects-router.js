// Write your "projects" router here!
const Project = require("./projects-model.js");
const express = require("express");

const router = express.Router();

//PROJECTS
//Middleware
async function checkId(req, res, next) {
  if (req.params.id) {
    try {
      const proj = await Project.get(req.params.id);
      if (!proj) {
        res.status(404).json({ message: "Invalid ID, Please try again" });
      } else {
        req.proj = proj;
        req.id = req.params.id;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: "Error server side" });
    }
  } else {
    res.status(400).json({ message: "an id is required" });
  }
}

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_:

// - `[GET] /api/projects` (R in CRUD-- reading)
router.get("/", async (req, res) => {
  try {
    const newProject = await Project.get();
    res.status(200).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message });
  }
});

// - `[GET] /api/projects/:id`(R in CRUD-- reading)
router.get("/:id", checkId, async (req, res) => {
  res.status(200).json(req.proj);
});

// - `[POST] /api/projects` (C in CRUD -- Creating)
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.insert(req.body);
    if (newProject) {
      res.status(201).json(newProject);
    } else {
      res.status(400).json({
        message: "Unable to create project",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - `[PUT] /api/projects/:id` (U of Crud) -- Update returns the updated project as the body of the _response_.

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const act = req.body;
  try {
    const updateProject = await Project.update(id, act);
    if (updateProject) {
      res.status(200).json(updateProject);
    } else {
      res.status(404).json({ message: "That id doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - `[DELETE] /api/projects/:id` returns no _response_ body.
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProject = await Project.remove(id);
    res.status(204).json(deleteProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of Projects for a project:

// - `[GET] /api/projects/:id/Projects` sends an array of Projects (or an empty array) as the body of the response. //Not sure how to actually get back only the Projects
router.get("/:id/actions", checkId, async (req, res) => {
  try {
    const projectActions = await Project.getProjectActions(req.id);
    if (projectActions) {
      res.status(200).json(projectActions);
    } else {
      res
        .status(404)
        .json({ message: "no action associated with this project" });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
});
module.exports = router;
