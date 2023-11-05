import User from '../../module/user/userModel'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

//Registration


const Register = async (req: any, res: any) => {
    try {
        const passwd = req.body.password
        const Email=req.body.Email
        if (!passwd) {
            throw new Error("Please Enter Password")
        }

        const hashpassword = await bcrypt.hash(passwd, 10)

        let user: any = await User.create(
            {
                Name: req.body.Name,
                Email: Email,
                password: hashpassword
            });
        if (!user.Email) {
            throw new Error("Please Enter Email")
        }
        if (!user.Name) {
            throw new Error("Please Enter Name")
        }
        
        res.status(200).json({
            message: "User created",
            status: "Success"
        })


        //email verification And send mail to user email


        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"dreamhomeriss@gmail.com",
                pass:"dvxqzszzwwsokczr"
            }
        })

        const details={
            from:"dreamhomeriss@gmail.com",
            to:Email,
            subject:"blog",
            text:"thank you for your trust",
            html:`<b>hey ${req.body.Name}</b><br>This is first messege</br>`

        }
        transporter.sendMail(details,(err:any,info:any)=>{

            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log(info)
            }
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







//login



const login = async (req: any, res: any) => {

    try {
        let Email = req.body.Email
        let userpassword = req.body.password


        let user: any = await User.findOne({
            where: { Email: { [Op.eq]: Email } }
        })
        // console.log(user.password)
        // console.log(user.Email)
        if (!user) {
            return res.status(200).json({ massage: 'invalid user' })
        }
        userpassword = await bcrypt.compare(userpassword, user.password)
        if (!userpassword) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        //tocken generation

        let resp = {
            id: user.id,

        };
        let tocken = jwt.sign({ resp}, "secret", { expiresIn: '3000m' })
        res.json({ message: 'Login successesfully', tocken: tocken })
        // res.json({ message: 'Login successesfully' })



        



    }

    catch (error) {
        console.log('error during login', error)
        res.status(500).json({ message: 'sever error' })
    }

}





// tocken verification
 function verifyjwt(req:any,res:any,next:any){
    try {
        let authHeader = req.headers.authorization
        if (!authHeader) {
            res.status(500).send({ error: "no tocken provided" })
        }
        let tocken = authHeader.split(" ")[1]
        const decodedToken: any =jwt.verify(tocken, "secret", (err: any, decode: any) => {
            if (err) {
                res.status(500).send({ error: "Authentication failed" })
                console.log(decode)
            }
            else {
                req.payload = decode

                next()
            }
        })

    }
    catch (err) {
        res.send(500).send({ err: "failed" })
    }
}






//Edit

// const edit= async(req:any,res:any)=>{
//     try{
//     let body=req.body
//     console.log(body)
//     if(body.password)
//     {
//         const hashpassword=await bcrypt.hash(body.password,10)

//         await User.update({password:hashpassword},{where:{id:req.query.id}})
//         res.status(200).json({
//             message:"password changed",
//             status:"Success"})
//     }
//     if(body.image)
//     {

//         let user=await User.update({image:body.image},{where:{id:req.query.id}})
//         console.log(user)
//         res.json(user)
//         res.status(200).json({
//             message:"profile changed",
//             status:"Success"})

//     }}


//     catch (error) {
//         console.log( error)
//         res.status(500).json({ message: 'error in editing' })
// }
//}



//viewUser blog

const View=async(req:any,res:any)=>{

    const viewOne =await User.findOne({where:{id:req.query.id}})
    console.log(viewOne)
}











export default { Register, login, verifyjwt,View}