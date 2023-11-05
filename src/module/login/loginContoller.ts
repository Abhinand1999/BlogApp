import logins from './../login/loginmodule'
import bcrypt from 'bcrypt'
import {Op} from 'sequelize'
import jwt from 'jsonwebtoken'
import { NextFunction } from 'express'

//registration

const Register = async (req: any, res: any) => {
    try {
        const passwd = req.body.password
        if (!passwd) {
            throw new Error("Please Enter Password")
        }

        const hashpassword = await bcrypt.hash(passwd, 10)

        let login:any = await logins.create(
            {
                Name: req.body.Name,
                Email: req.body.Email,
                roll:req.body.roll,
                password: hashpassword
            });
        if (!login.Email) {
            throw new Error("Please Enter Email")
        }
        if (!login.Name) {
            throw new Error("Please Enter Name")
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



const bulk=async(req:any,res:any)=>{
    
    const body=req.body
    const Bulk=await logins.bulkCreate(
        body
 )
res.status(500).json({message:"successfully created",Bulk})

}



///login





// tocken verification
function verifyjwt(req:any,res:any,next:any)

{
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




const login = async (req: any, res: any) => {

    try {
        let Email = req.body.Email
        let userpassword = req.body.password


        let user: any = await logins.findOne({
            where: { Email: { [Op.eq]: Email } }
        })
        // console.log(user.password)
        // console.log(user.Email)
        if (!user) {
            return res.status(200).json({ massage: 'invalid user' })
        }
        if (!userpassword) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        //tocken generation

        let resp:any = {
            id: user.id,
            roll:user.roll

        };
        console.log(resp,"%%%%%%%%%%%%%%%")
        let tocken = jwt.sign({resp}, "secret", { expiresIn: '3000m' })
        res.json({ message: 'Login successesfully', tocken: tocken })
        // res.json({ message: 'Login successesfully' })


    }

    catch (error) {
        console.log('error during login', error)
        res.status(500).json({ message: 'sever error' })
    }

}





// token type veification


const view=async(req:any,res:any,next:any)=>
{
    const roll=req.payload.resp.roll
    const id=req.payload.resp.id
    console.log(roll,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

    if(roll=='admin'){
    const view=await logins.findAll({where:{roll:{[Op.in]:["admin","user"]}}})
    res.status(500).json({view})
    }
    

    if(roll=='user'){
    const view=await logins.findAll({where:{roll:{[Op.in]:["user"]}}})
    res.status(500).json({view})
        }

    if(roll=="superadmin"){
    const view=await logins.findAll()
    res.status(500).json({view})
    }



}

function checkuser(accessKey:any){
    return (req:any,res:any,next:NextFunction)=>{
        const roll =req.payload.resp.roll
        if(!accessKey.includes(roll)){
            res.status(401).send({ message: "unauthorized access" });
        }
        else {
            next()
        }

    }
}














export default {Register,bulk,login,verifyjwt,view,checkuser} 