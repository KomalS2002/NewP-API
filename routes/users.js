const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {isAdmin} = require("../models/User");
// router.get("/", (req,res)=>{
//    res.send("users page");
// })

//update user
router.put("/:id", async(req,res)=>{
   if(req.body.userId === req.params.id || req.user.isAdmin){
      if(req.body.password)
  { try{
   const salt = await bcrypt.genSalt(10);
   req.body.password = await bcrypt.hash(req.body.password, salt);
   }catch(err){
      console.log(err);
   };
   try{
      const user = await User.findByIdAndUpdate(req.params.id, 
         {$set:req.body,});
      req.status(200).json("account updated")
      }catch(err){console.log(err);}}
   }else {
      return res.status(403).json("you can update only your profile")
   };

})

module.exports = router 
