const router = require("express").Router();
router.get("/", (req,res)=>{
   res.send("users page");
})

module.exports = router 