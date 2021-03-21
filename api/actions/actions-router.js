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
      next({ error: err, message: err.message, status: 500 });
    }
  }
}

async function checkDatFunctionBody(req, res, next) {
  if (!req.body || !req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Both name and description are required strings" });
  } else {
    next();
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
    const newAction = await Action.insert(req.body);
    if (newAction) {
      res.status(200).json(newAction);
    } else {
      res.status(400).json({
        message: `Unable to create action.`,
      });
    }
  } catch (err) {
    console.log(err, "error");
  }
});
// - `[PUT] (U of Crud) -- Update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const act = req.body;
  try {
    const updateAction = await Action.update(id, act);
    if (updateAction) {
      res.status(200).json(updateAction);
    } else {
      res.status(404).json({ message: "That id doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
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
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

module.exports = router;
