import blog from '../blog/blogModel'
import user from '../user/userModel'
import { Op } from 'sequelize'
import multer from 'multer'
import path from 'path'

import moment from 'moment'


//image uplode

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single("file")







//create blog

const createBlog = async (req: any, res: any) => {
    try {


        let Blog: any = await blog.create({
            user_id: req.payload.resp.id,
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename
        })

        if (!Blog){
            console.log("blognot created")
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


//join  table


user.hasMany(blog, { foreignKey: 'id' });
blog.belongsTo(user, { foreignKey: 'id' });












//viewUser blog



const ViewUser = async (req: any, res: any) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    console.log(page)
    console.log(size)

    const list = await blog.findAll(
        {
            limit: size, offset: page * size, order: [
                ['updatedAt', 'DESC']], include: [{
                    model: user,
                    attributes: ['id', 'Name', 'Email',]
                }]
        });
    // console.log(JSON.stringify(list, null, 2));
    // const viewOne =await blog.findAll({})
    res.status(500).json({ list })
}




//delete the blog



const deleteBlog = async (req: any, res: any) => {


    try {
        const usid = req.payload.resp.id
        const Delete = await blog.destroy({ where: { user_id: usid } })
        console.log(Delete)
        if (!Delete) {
            console.log("file not deleted")
        }
        res.status(200).json({
            message: "blog Deleted....",
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



//updateblog


const updateBlog = async (req: any, res: any) => {
    try {
        const user_id = req.payload.resp.id
        const body = req.body
        if (body.title) {
            let Update = await blog.update({ title: body.title }, { where: { id: user_id } })
            if (!Update) {
                console.log("file not Update")
            }
            res.status(200).json({
                message: "blog title Updated....",
                status: "Success"
            })
        }


        if (body.description) {
            let Update = await blog.update({ description: body.description }, { where: { id: user_id } })
            if (!Update) {
                console.log("file not Update")
            }
            res.status(200).json({
                message: "blog description Updated....",
                status: "Success"
            })
        }


    }
    catch (error) {
        console.log(error)
        res.status(200).json({
            status: false,
            message: error
        })
    }
}

//bulk create 






const bulk=async(req:any,res:any)=>{
    
    const body=req.body
    const Bulk=await blog.bulkCreate(
        body
 )
res.status(500).json({message:"successfully created",Bulk})

}


//upsert


const Upsert=async(req:any,res:any)=>{
try{
    const usid=req.payload.resp.id
const [result,created] =await blog.upsert({
    user_id:usid,
    title:req.body.title,
    description:req.body.description}
)
if(result){
    res.status(500).json({result })
    console.log("succssfully added")
}
if(created){

    res.status(500).json({created })
    
}}
catch(error){
    console.log(error)
    res.status(200).json({
        status: false,
        message: error})
}

}


//in 


const ViewUserin = async (req: any, res: any) => {
    try{
        let id=req.body.id
    const list = await blog.findAll(
        {
            where:{id:{[Op.in]:id}},attributes:["id","title"]
        });

    res.status(500).json({ list })
    }
    catch(error)
    {
        console.log(error)
        res.status(200).json({
            status: false,
            message: error})
    }
}


// last week enty using moment



const today=moment();

// console.log("..................",currentdate)


const lastweekblog=async(req:any,res:any)=>{
    try{
       //const day =req.query.day
       let last
        const formatdate=today.format('YYYY-MM-DD HH:mm:ss')

        console.log("currentdate:",formatdate)
        
     last=await blog.findAndCountAll({where:{
        updatedAt:{[Op.gte]:moment().subtract(1,'days')},
    },attributes:['id','title','description']})
    //res.status(500).json({message:"last day",last})
///console.log(last)


     last=await blog.findAndCountAll({where:{
        updatedAt:{[Op.gte]:moment().subtract(1,'week')},
    },attributes:['id','title','description']})
    //res.status(500).json({message:"week",last})
//console.log(last)


    last=await blog.findAndCountAll({where:{
        updatedAt:{[Op.gte]:moment().subtract(1,'months')},
    },attributes:['id','title','description']})
  //  res.status(500).json({message:"month",last})
//console.log(last)



    // const localDate=moment.updateLocale('en',{  longDateFormat: {
    //     LT: "h:mm A",
    //     LTS: "h:mm:ss A",
    //     L: "MM/DD h:mm",
    //     l: "M/D/YYYY",
    //     LL: "MMMM Do YYYY",
    //     ll: "MMM D YYYY",
    //     LLL: "MMMM Do YYYY LT",
    //     lll: "MMM D YYYY LT",
    //     LLLL: "dddd, MMMM Do YYYY LT",
    //     llll: "ddd, MMM D YYYY LT"
    // }
    
    // res.status(500).json(today.format('L'))
    // console.log("LT",today.format('LT'))
    // console.log("LTS",today.format('LTS'))
    // console.log("L",today.format('L'))
    // console.log("LL",today.format('LL'))
    // console.log("ll",today.format('ll'))
    // console.log("LLL",today.format('LLL'))
    // console.log("lll",today.format('lll'))
    // console.log("LLLL",today.format('LLLL'))
    // console.log("llll",today.format('llll'))

    
    // const d = moment.relativeTimeThreshold('h');
    // console.log("Least number of  hours to be considered as a day", d)


    console.log("%%%%%%%%%%%%%%%%%:",today.subtract(1,'days').format('lll'))

    last=await blog.findAndCountAll({where:{
        updatedAt:{[Op.gte]:moment().subtract(1,'months')},
    },attributes:['id','title','description']})
const date=req.query.date
const end=req.query.date
const start=moment(date,"DD-MM-YYYY")
console.log(start)

const End=moment(end,"DD-MM-YYYY")


    // last=await blog.findAndCountAll({where:{
    //     updatedAt:{[Op.gte]:moment().(1,'months')},
    // },attributes:['id','title','description']})


}
    catch(error){
        console.log(error)
        res.status(200).json({massage:"error"})
    }


    

}






export default { createBlog, ViewUser, upload, deleteBlog, updateBlog,Upsert,bulk,ViewUserin,lastweekblog}