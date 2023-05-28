const router = require("express").Router();
const Post = require ("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async(req,res)=>{
    const newPost = new Post(req.body)
    try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
    }catch(err){console.log(err)}
})

//update posts
router.put("/:id", async(req,res)=>{
try{
const post = await Post.findById(req.params.id);
if(post.userId === req.body.userId){
 await post.updateOne({$set: req.body});
 res.status(200).json("post updated successfully")
}else {
    return res.status(403).json("you can update only your posts")
}
}catch(err){console.log(err)}
})

//delete post
router.delete("/:id", async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
     await post.deleteOne();
     res.status(200).json("post deleted successfully")
    }else {
        return res.status(403).json("you can delete only your posts")
    }
    }catch(err){console.log(err)}
    })

module.exports = router;