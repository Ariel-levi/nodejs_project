const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
  res.json({msg:"Ariel Levi Project On Toys"})
})

module.exports = router;