const express = require("express");
const actionRouter = require("./actions/actions-router.js");
const projectRouter = require("./projects/projects-router.js");
const server = express();

//Global middleware to change to JSON
server.use(express.json());
//Pipelines Action/Projects
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

//Checking we are live
server.get("/", (req, res) => {
  res.json({ hello: "world" });
});
// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
