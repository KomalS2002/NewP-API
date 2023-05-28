const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {isAdmin, findById} = require("../models/User");
// router.get("/", (req,res)=>{
//    res.send("users page");
// })

//update user
router.put("/:id", async(req,res)=>{
   if(req.body.userId === req.params.id || req.body.isAdmin){
      if(req.body.password)
  { try{
   const salt = await bcrypt.genSalt(10);
   req.body.password = await bcrypt.hash(req.body.password, salt);
   }catch(err){
      console.log(err);
   };
   }
   try{
      const user = await User.findByIdAndUpdate(req.params.id, 
         {$set:req.body,});
      res.status(200).json("account updated")
      }catch(err){console.log(err);}
   }else {
      return res.status(403).json("you can update only your profile")
   };
})

//delete user
router.delete("/:id", async(req,res)=>{
   if(req.body.userId === req.params.id || req.body.isAdmin){
      try{
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account deleted");
      }catch(err){console.log("err");}
   }else{
      return res.status(403).json("you can delete only your account")
   }
})

//get user
router.get("/:id", async(req,res)=>{
   try{
   const user = await User.findById(req.params.id)
   const{password, updatedAt,...other} = user._doc
   res.status(200).json(other);
   }catch(err){console.log(err);}
})

module.exports = router 
