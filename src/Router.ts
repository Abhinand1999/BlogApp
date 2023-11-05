const express = require('express');
const router = express.Router();
import user from './module/user/userRouter'
import blog from './module/blog/blogRoter'
import comment from './module/comments/commentController';
user.use('/',user)
blog.use('/',blog)

router.post('/comment',comment.createComments)
export default router