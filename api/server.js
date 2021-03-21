const e = require("express");
const express = require("express");
const actionRouter = require("./actions/actions-router.js");
const server = express();

//Global middleware to change to JSON
server.use(express.json());
//Pipelines Action
server.use("/api/actions", actionRouter);

//Checking we are live
server.get("/", (req, res) => {
  res.json({ hello: "world" });
});
// Complete your server here!
// Do NOT `server.listen()` inside this file!
const Action = require("./projects/projects-model.js");

//PROJECTS

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_:

// - `[GET] /api/projects` (R in CRUD-- reading)
server.get("/api/projects", async (req, res) => {
  try {
    const newAction = await Action.get();
    res.status(200).json(newAction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - `[GET] /api/projects/:id`(R in CRUD-- reading)
server.get("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newAction = await Action.get(id);
    res.status(200).json(newAction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - `[POST] /api/projects` (C in CRUD -- Creating)
server.post("/api/projects", async (req, res) => {
  try {
    const newAction = await Action.insert(req.body);
    if (newAction) {
      res.status(201).json(newAction);
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

server.put("/api/projects/:id", async (req, res) => {
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

// - `[DELETE] /api/projects/:id` returns no _response_ body.
server.delete("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAction = await Action.remove(id);
    res.status(204).json(deleteAction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of actions for a project:

// - `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response. //Not sure how to actually get back only the actions
server.get("/api/projects/:id/actions", async (req, res) => {
  const { id } = req.params;
  try {
    const newAction = await Action.get(id);
    if (newAction) {
      res.status(200).json(newAction);
    } else {
      res.status(404).json({
        message: "This ID doesn't exist, check what id's exist at api/projects",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: err.message, status: 500 });
  }
});
module.exports = server;
