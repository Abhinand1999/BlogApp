import express from "express";
import routeruser from './module/user/userRouter'
import routerblog from "./module/blog/blogRoter";
import routerComment from "./module/comments/commentRouter";
import bodyparser from 'body-parser'
import login from './module/login/loginrouter'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(bodyparser.json())
const port =  process.env.PORT;
console.log(port)
app.get('/', (req, res) => {
    res.send('hello')
})
app.use('/user', routeruser)
app.use('/blog', routerblog)
app.use('/image', express.static('./upload'))
app.use('/comment', routerComment)
app.use('/login',login)
//app.use("/uploads", express.static('./uploads'));

app.listen(port, () => {
    console.log("connect succsfully", { port })
})



