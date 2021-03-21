//Note that we may need something along the lines of This to get it to deploy. Do some digging to check
//require("dotenv").config();
// const server = require("./api/server.js");

// const port = process.env.PORT;

// server.listen(port, () => {
//   console.log(`server listening on port: ${port}`);
// });

const server = require("./api/server.js");

const port = 3000;
server.listen(port, () => {
  console.log(`### listening on http://localhost:3000 \n`);
});
