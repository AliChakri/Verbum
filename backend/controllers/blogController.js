
const mongoose = require("mongoose");
const PostModel = require("../models/postModel");


const createPost = async (req,res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });
        const { title,cat,description,image} = req.body;

        if(!title || !cat || !description){
            return res.json({success: false, message: 'Invalid Credentialsd'});
        }

        const newPost = await PostModel.create(
            {
                title,
                cat,
                description,
                image
            }
        );
        return res.status(201).json({success: true, data: newPost, message: 'Created Successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
};

const getPosts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const user = req.user;

    const query = {};

    // If category is passed, filter by category
    if (category) {
      query.cat = category;
    }

    // If search is passed, filter by title using regex (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const blogs = await PostModel.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs,
      user,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};


const getPost = async (req,res) => {
    try {
        const { postId } = req.params;
        if(!mongoose.isValidObjectId(postId)){
            return res.status(400).json({success: false, message: 'Valid Id Not Valid'});
        }
        const post = await PostModel.findById(postId); 
        if(!post){
            return res.status(400).json({success: false, message: 'Post Not Exist'});
        }

        return res.status(200).json({success: true, data: post});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
};

const updatePost = async (req,res) => {
    try {
        const { postId } = req.params;
        const post = req.body;

        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

        if(!mongoose.isValidObjectId(postId)){
            return res.json({success: false, message: 'Valid Id Not Valid'});
        }
        const newPost = await PostModel.findByIdAndUpdate(postId, post, {new: true});
        if(!newPost){
            return res.json({success: false, message: 'Post Not Exist'});
        }

        return res.status(200).json({success: true, data: newPost});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
};

const deletePost = async (req,res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

        if(!mongoose.isValidObjectId(id)){
            return res.json({success: false, message: 'Valid Id Not Valid'});
        }
        const post = await PostModel.findByIdAndDelete(id);
        if(!post){
            return res.json({success: false, message: 'Post Not Exist'});
        }

        return res.status(200).json({success: true, message: 'Delted Successfully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
};



module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}
