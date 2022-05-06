const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/hello", async (req, res) => {
  // Check if the EC2 instance is down, if it is down then bring it back up, else do nothing.
  // Code to up the EC2 instance....

  // Check if the EC2 instance is up, if it is up then shut it down, if it is already down then do nothing.
  // Code to shutdown the EC3 instance...

  const animals = [{ name: "Zebra" }, { name: "Dog" }, { name: "Bear" }];
  res.status(200).json(animals);
});
app.listen(3003, () => console.log("Server is up and running"));
