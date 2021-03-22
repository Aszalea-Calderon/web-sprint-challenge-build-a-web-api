// Write your "projects" router here!
const Project = require("./projects-model.js");
const express = require("express");

const router = express.Router();

//PROJECTS
//Middleware

async function checkTheID(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ message: `${id} is not a valid id.`, status: 404 });
    }
  } catch (err) {
    next({ error: err, status: 500 });
  }
}

function checkTheBody(req, res, next) {
  const body = req.body;
  try {
    if (body && Object.keys(body).length === 0) {
      next({
        message: "missing project info. Please provide name and description",
        status: 400,
      });
    } else if (!body.name) {
      next({ message: "missing project name", status: 400 });
    } else if (!body.description) {
      next({ message: "missing project description", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err, status: 500 });
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
    res.status(500).json({ error: err });
  }
});

// - `[GET] /api/projects/:id`(R in CRUD-- reading)
router.get("/:id", checkTheID, async (req, res) => {
  res.status(200).json(req.proj);
});

// - `[POST] /api/projects` (C in CRUD -- Creating)
router.post("/", checkTheBody, async (req, res) => {
  try {
    const newProject = await Project.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
////
// - `[PUT] /api/projects/:id` (U of Crud) -- Update returns the updated project as the body of the _response_.

router.put("/:id", checkTheID, checkTheBody, async (req, res) => {
  const { id } = req.params;
  const act = req.body;
  try {
    const updateProject = await Project.update(id, act);
    res.status(202).json(updateProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
////
// - `[DELETE] /api/projects/:id` returns no _response_ body.
router.delete("/:id", checkTheID, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProject = await Project.remove(id);
    res.status(204).json(deleteProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of Projects for a project:

// - `[GET] /api/projects/:id/Projects` sends an array of Projects (or an empty array) as the body of the response. //Not sure how to actually get back only the Projects
router.get("/:id/actions", checkTheID, async (req, res) => {
  const { id } = req.params;
  try {
    const projActions = await Project.getProjectActions(id);
    res.status(200).json(projActions);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
//
