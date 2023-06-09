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

//like a post
router.put("/:id/like", async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.iserId)){
    await post.updateOne({$push:{likes: req.body.userId}});
    res.status(200).json("post liked successfully")
    }//dislike post
    else{
    await post.updateOne({$pull: {likes:req.body.userId}});
    req.status(200).json("post has been disliked")
    }
    }catch(err){console.log(err)}
})

//get post
router.get("/:id", async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
    }catch(err){console.log(err)}
})

//get timeline posts
router.get("/timeline/:userId", async(req,res)=>{
try{
const currentUser = await User.findById(req.params.userId);
const userPosts = await Post.find({userId:currentUser._id});
const friendPosts = await Promise.all(
    currentUser.following.map((friendId)=>{
        return Post.find({userId: friendId});
    })
);
res.status(200).json(userPosts.concat(...friendPosts))
}catch(err){console.log(err)}
}
)

//get user's posts for profile page
//get timeline posts
router.get("/profile/:username", async(req,res)=>{
    try{
    const user = await User.findOne({username:req.params.username})
    const posts = await Post.find({userId:user._id})
    res.status(200).json(posts);
    }catch(err){console.log(err)}
    }
    )
module.exports = router;