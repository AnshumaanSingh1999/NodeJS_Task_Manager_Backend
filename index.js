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


app.get("/tasks",(req,res)=>{
    const q="select * from tasks_db"
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            
            return res.json(data)
        }
    })

})



app.post("/usertasks",(req,res)=>{
    const value=[
        req.body.userid=String(req.body.userid)
    ]
    const q="select * from tasks_db where userid=?"
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            console.log(data)
            return res.json(data)
        }
    })
})



app.get("/usertasks:userid",(req,res)=>{
    const value=string(req.params.userid)

    const q="select * from tasks_db where userid=?"
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
           
        }
        else if(data){
            
            console.log(data)
            return res.json(data)
        }
    })
})



app.post("/addtask",(req,res)=>{
    const q="insert into tasks_db (userid,	task,	status) values (?)"
    const value=[
        req.body.userid=String(req.body.userid),
        req.body.task=String(req.body.task),
        req.body.status=String(req.body.status),
    ]
    console.log(value)
    console.log(typeof(value))
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Added")
        }
    })
})




app.post("/updatetask",(req,res)=>{
    const q="update tasks_db set task=?, status=? where userid=? and taskid=?"
    const value=[
        req.body.task=String(req.body.task),
        req.body.status=String(req.body.status),
        req.body.userid=String(req.body.userid),
        req.body.taskid=String(req.body.taskid),
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Updated")
        }
    })
})






app.post("/deletetask",(req,res)=>{
    const q="delete from tasks_db where userid=? and taskid=?"
    const value=[
        req.body.userid=String(req.body.userid),
        req.body.taskid=String(req.body.taskid),
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Deleted")
        }
    })
})


app.listen(8800,()=>{
    console.log("Port has been set to localhost:8800")
})