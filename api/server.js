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

//PROJECTS

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_:

// - `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
// - `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
// - `[POST] /api/projects` returns the newly created project as the body of the _response_.
// - `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
// - `[DELETE] /api/projects/:id` returns no _response_ body.

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of actions for a project:

// - `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.

module.exports = server;
