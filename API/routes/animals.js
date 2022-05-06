const router = require("express").Router();
router.get("/animals", async (req, res) => {
  const animals = [{ name: "Zebra" }, { name: "Dog" }, { name: "Bear" }];
  const resp = {
    // "EC2 timer": res.ec2_timer,
    // animals: animals,
    middle_ware_data: res.middle_ware_data,
  };
  console.log(resp);
  res.status(200).json(resp);
});
module.exports = router;
