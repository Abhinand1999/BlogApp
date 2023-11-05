import blog from '../blog/blogModel'
import comment from '../comments/commentModel'
import user from '../user/userModel'

//create the comment

const createComments = async (req: any, res: any) => {
    try {
        const uid = req.payload.resp.id
        console.log(uid)
        console.log("blogid:", req.query.blog_id)

        const Comment = await comment.create({
            user_id: uid,
            blog_id: req.query.blog_id,
            comment: req.body.comment,
        }

        )

        if (!Comment) {
            console.log("comment created")
        }

        res.status(200).json({
            message: "User created",
            status: "Success"
        })
    }
    catch (error) {
        console.log(error)
        res.status(200).json({
            status: false,
            message: error
        })
    }
}



user.hasMany(blog, { foreignKey: 'id' });
blog.belongsTo(user, { foreignKey: 'id' });


blog.hasMany(comment, { foreignKey: 'id' })
comment.belongsTo(blog, { foreignKey: 'id' });

user.hasMany(comment, { foreignKey: 'id' });
comment.belongsTo(user, { foreignKey: 'id' });






//list the comment

const viewcomment = async (req: any, res: any) => {
    try {
        const page = parseInt(req.query.page)
        const size = parseInt(req.query.size)
        console.log(page)
        console.log(size)
        const list = await comment.findAndCountAll({
            limit: size, order: [
                ['updatedAt', 'DESC']], include: [{
                    model: user,
                    attributes: ['Name', 'Email',],
                }, {
                    model: blog,
                    attributes: ['title', 'description',]
                }],
        });
        // console.log(JSON.stringify(list, null, 2));
        // const viewOne =await blog.findAll({})
        res.status(500).json({ list })
    }
    catch (error) {
        console.log(error)
        res.status(200).json({
            status: false,
            message: error
        })
    }

}


//delete comment


const deleteComment = async (req: any, res: any) => {
    try {
        const uid = req.payload.resp.id
        const Delete: any = await comment.destroy({ where: { user_id: uid } })
        if (Delete) {
            console.log("delete succsefully")
        }
        res.status(200).json({
            message: "comment deleted",
            status: "Success"
        })
    }
    catch (error) {
        console.log(error)
        res.status(200).json({
            status: false,
            message: error
        })
    }
}




export default { createComments, deleteComment, viewcomment }