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
    database:"book_db"
})

app.get("/", (req,res)=>{
    res.json("API is LIVE!")
})




app.listen(8800,()=>{
    console.log("Port has been set to localhost:8800")
})