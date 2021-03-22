//ACTION IMPORT
const Action = require("./actions-model.js");
const express = require("express");
const router = express.Router();

//Middleware
async function checkID(req, res, next) {
  if (!req.params.id) {
    res.status(404).json({ message: "an id is required" });
  } else {
    const { id } = req.params;
    try {
      const action = await Action.get(id);
      if (action) {
        req.action = action;
        next();
      } else {
        next({ message: `${id} is not a valid id`, status: 404 });
      }
    } catch (err) {
      next({ error: err, status: 500 });
    }
  }
}

async function checkDatFunctionBody(req, res, next) {
  const body = req.body;
  try {
    if (body && Object.keys(body).length === 0) {
      next({
        message:
          "missing actions data. Please provide project_id, description and notes",
        status: 400,
      });
    } else if (!body.project_id) {
      next({ message: "missing project id", status: 400 });
    } else if (!body.description) {
      next({ message: "missing action description", status: 400 });
    } else if (!body.notes) {
      next({ message: "missing action notes", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err, status: 500 });
  }
}
//ACTIONS
// - `[GET] /api/actions`(R in CRUD-- reading)

router.get("/", async (req, res) => {
  try {
    const act = await Action.get();
    if (act) {
      res.status(200).json(act);
    } else {
      res.status(400).json([]);
    }
  } catch (err) {
    console.log(err);
  }
});

// - `[GET] /api/actions/:id`(R in CRUD-- reading)
router.get("/:id", checkID, (req, res) => {
  res.status(200).json(req.action);
});

// - `[POST]  (C in CRUD -- Creating)
//NOTE-- This required a project id, description, notes, and completed or not
router.post("/", checkDatFunctionBody, async (req, res) => {
  try {
    const newProject = await Action.insert(req.body);
    if (newProject) {
      res.status(201).json(newProject);
    } else {
      res.status(400).json({
        message: "Unable to create project",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, status: 500 });
  }
});
// - `[PUT] (U of Crud) -- Update

router.put("/:id", checkID, checkDatFunctionBody, async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedAction = await Action.update(id, changes);
    res.status(200).json(updatedAction);
  } catch (err) {
    next({ error: err, status: 500 });
  }
});
// - `[DELETE]  (D in CRUD)-- Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAction = await Action.remove(id);
    res.status(204).json(deleteAction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, status: 500 });
  }
});

module.exports = router;
