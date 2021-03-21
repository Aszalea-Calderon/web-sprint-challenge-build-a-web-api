// Write your "actions" router here!
//Action Router

//ACTION IMPORT
const Action = require("./actions-model.js");
const express = require("express");

const router = express.Router();

//ACTIONS
// - `[GET] /api/actions`(R in CRUD-- reading)

router.get("/", async (req, res) => {
  try {
    const newAction = await Action.get();
    res.status(200).json(newAction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - `[GET] /api/actions/:id`(R in CRUD-- reading)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newAction = await Action.get(id);
    res.status(200).json(newAction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - `[POST]  (C in CRUD -- Creating)
//NOTE-- This required a project id, description, notes, and completed or not
router.post("/", async (req, res) => {
  try {
    const newAction = await Action.insert(req.body);
    if (newAction) {
      res.status(201).json(newAction);
    } else {
      res.status(400).json({
        message: "Unable to create action",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: err.message, status: 500 });
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
