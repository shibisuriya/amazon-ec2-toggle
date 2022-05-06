const router = require("express").Router();
router.get("/animals", async (req, res) => {
  const animals = [{ name: "Zebra" }, { name: "Dog" }, { name: "Bear" }];
  const resp = {
    // "EC2 timer": res.ec2_timer,
    // animals: animals,
    date_components: res.date_components,
  };
  console.log(resp);
  res.status(200).json(resp);
});
module.exports = router;
