import  express  from "express";
import mysql from "mysql";
import cors from "cors";


const app=express()
app.use(express.json())
app.use(cors())


const db=mysql.createConnection({
    host:"Localhost",
    password:"",
    user:"root",
    database:"task_manager_db"
})


app.get("/", (req,res)=>{
    res.json("API is LIVE!")
})



app.post("/signup",(req,res)=>{
    const q="insert into users_db (username,password) values (?)"
    const value=[
        req.body.username=String(req.body.username),
        req.body.password=String(req.body.password)    
    ]
    db.query(q,[value],(err,data)=>{
        console.log(value)

        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("User Added")
        }
    })
})


app.post("/signin",(req,res)=>{
    const q="select * from users_db where username=? and password=?"
    const value=[
        req.body.username=String(req.body.username),
        req.body.password=String(req.body.password)      
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            console.log(data)
            return res.json(data)
        }
    })
})


app.listen(8800,()=>{
    console.log("Port has been set to localhost:8800")
})