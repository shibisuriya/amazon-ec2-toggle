const router = require("express").Router();
router.get("/animals", async (req, res) => {
  const animals = [{ name: "Zebra" }, { name: "Dog" }, { name: "Bear" }];
  res.json(animals);
});
module.exports = router;
