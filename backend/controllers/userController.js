


const mongoose = require("mongoose");
const PostModel = require("../models/postModel");


const getPosts = async (req, res) => {
    try {
        let { cat,page=1, limit=6 } = req.query;
        const query = cat ? { cat } : {};

        page = parseInt(page) || 1;   // Default to page 1
        limit = parseInt(limit) || 5; // Default to 10 posts per page

        const totalPosts = await PostModel.countDocuments(query); // Count total posts
        const totalPages = Math.ceil(totalPosts / limit); // Total pages

        let posts;

        if(cat){
            posts = await PostModel.find({ cat })
            .sort({ createdAt: -1 }) // Sort by latest posts
            .skip((page - 1) * limit) // Skip previous pages
            .limit(Number(limit)); // Get limited posts
        } else {
            posts = await PostModel.find()
            .sort({ createdAt: -1 }) // Sort by latest posts
            .skip((page - 1) * limit) // Skip previous pages
            .limit(limit); // Get limited posts
        }

        res.json({
            success: true,
            page,
            totalPages,
            totalPosts,
            posts
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
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

const searchPosts = async (req, res) => {
    try {
        const { query } = req.query; // Get search term from query parameters
        if (!query) return res.status(400).json({ message: "Search query is required" });

        const posts = await PostModel.find({ 
            title: { $regex: query, $options: "i" } // Case-insensitive search
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const likePost = async (req, res) => {
//     const { postId, userId } = req.body;

//     try {
//         const userId = req.user._id;  // ✅ Access authenticated user

//         const post = await PostModel.findById(postId);
//         if (!post) return res.status(404).json({ message: "Post not found" });

//         // Toggle like
//         if (post.likes.includes(userId)) {
//             post.likes = post.likes.filter(id => id !== userId);
//         } else {
//             post.likes.push(userId);
//         }

//         await post.save();
//         res.json({ likes: post.likes });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

//  // Add a comment
// const addComment = async (req, res) => {
//     const { postId, userId, text } = req.body;

//     try {
//         const post = await PostModel.findById(postId).populate("comments.userId", "name").exec();  // ✅ This will fetch only the name.
//         if (!post) return res.status(404).json({ message: "Post not found" });

//         const newComment = { userId, text, likes: [] };
//         post.comments.push(newComment);

//         await post.save();
//         res.json(post.comments);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Edit a comment
// const editComment = async (req, res) => {
//     const { postId, commentId, text } = req.body;

//     try {
//         const post = await PostModel.findById(postId);
//         if (!post) return res.status(404).json({ message: "Post not found" });

//         const comment = post.comments.id(commentId);
//         if (!comment) return res.status(404).json({ message: "Comment not found" });

//         comment.text = text;
//         await post.save();
//         res.json(post.comments);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Delete a comment
// const deleteComment = async (req, res) => {
//     const { postId, commentId } = req.body;

//     try {
//         const post = await PostModel.findById(postId);
//         if (!post) return res.status(404).json({ message: "Post not found" });

//         post.comments = post.comments.filter(c => c._id.toString() !== commentId);
//         await post.save();
//         res.json(post.comments);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Like a comment
// const likeComment = async (req, res) => {
//     const { postId, commentId, userId } = req.body;

//     try {
//         const post = await PostModel.findById(postId);
//         if (!post) return res.status(404).json({ message: "Post not found" });

//         const comment = post.comments.id(commentId);
//         if (!comment) return res.status(404).json({ message: "Comment not found" });

//         // Toggle like
//         if (comment.likes.includes(userId)) {
//             comment.likes = comment.likes.filter(id => id !== userId);
//         } else {
//             comment.likes.push(userId);
//         }

//         await post.save();
//         res.json(comment.likes);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };



module.exports = {
    getPosts,
    getPost,
    searchPosts
    // likePost,
    // addComment,
    // editComment,
    // deleteComment,
    // likeComment

}
