


const express = require('express');
const { 
        getPosts,
        getPost,
        searchPosts,
        } = require('../controllers/userController');

const {userAuth, checkUser} = require('../middleWare/userAuth');

const userRouter = express.Router();

userRouter.get('/', userAuth, getPosts);
userRouter.get('/:postId', getPost);
userRouter.get("/check", userAuth, checkUser);
userRouter.get("/search", userAuth, checkUser, searchPosts);

// userRouter.post('/like', userAuth, checkUser ,likePost);
// userRouter.post('/comment', userAuth, checkUser ,addComment);
// userRouter.put('/comment/edit', userAuth, checkUser ,editComment);
// userRouter.delete('/comment/delete', userAuth, checkUser ,deleteComment);
// userRouter.put('/comment/like', userAuth, checkUser ,likeComment);

module.exports = userRouter;