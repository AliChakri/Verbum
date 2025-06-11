
const express = require('express');
const { createPost, 
        getPosts,
        getPost,
        updatePost,
        deletePost,
        } = require('../controllers/blogController');

const {userAuth,checkUser, checkAdmin} = require('../middleWare/userAuth');

const blogRouter = express.Router();

blogRouter.get('/', userAuth, getPosts);
blogRouter.get('/:postId', getPost);

blogRouter.post('/create', userAuth, checkAdmin, createPost);
blogRouter.patch('/edit/:postId', userAuth, checkAdmin, updatePost);
blogRouter.delete('/:id', userAuth, checkAdmin, deletePost);

blogRouter.get("/check", userAuth, checkUser);

// blogRouter.post('/like', userAuth ,likePost);
// blogRouter.post('/comment', userAuth ,addComment);
// blogRouter.put('/comment/edit', userAuth ,editComment);
// blogRouter.delete('/comment/delete', userAuth ,deleteComment);
// blogRouter.put('/comment/like', userAuth ,likeComment);


module.exports = blogRouter;