const express = require('express');
const routerComment = express.Router();
import verifyjwt from '../user/userController'
import comment from '../comments/commentController'

//create the comment
routerComment.post('/createcomment', verifyjwt.verifyjwt, comment.createComments);
//list the comment
routerComment.get('/viewComment', verifyjwt.verifyjwt, comment.viewcomment)
//delete the comment
routerComment.delete('/deleteComment', verifyjwt.verifyjwt, comment.deleteComment)

export default routerComment