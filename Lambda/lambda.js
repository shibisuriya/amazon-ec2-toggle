const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/hello", async (req, res) => {
  // Code to up the EC2 instance....

  // Code to shutdown the EC3 instance...

  const animals = [{ name: "Zebra" }, { name: "Dog" }, { name: "Bear" }];
  res.status(200).json(animals);
});
app.listen(3003, () => console.log("Server is up and running"));
