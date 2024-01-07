const express = require("express");
const { auth, isUser } = require("../middlewares/auth");
const { getFollowers } = require("../controllers/followers"); // Import getFollowers from the controller
const {getPosts} =require("../controllers/Posts");
const router = express.Router();
const {getDetails} =require("../controllers/User");
const {createPost}=require("../controllers/Posts");
const {updateUser}=require("../controllers/User");

router.get("/getfollowers",auth,  getFollowers); // Using getFollowers as a middleware
router.get("/getPosts",auth,getPosts);
router.get("/getDetails",auth,getDetails);
router.post("/createPost",auth,createPost);
router.post("/updateUser",auth,updateUser);


module.exports = router;
