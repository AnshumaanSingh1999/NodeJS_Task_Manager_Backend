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

app.get("/books",(req,res)=>{
    const q="select * from book_data"
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json(data)
        }
    })
})

app.post("/add_book",(req,res)=>{
    const q="insert into book_data (book_name,book_description,book_author) values (?)"
    // const value=["Andshand3","Phaltu3","Nalayak3"]
    const value=[
        req.body.book_name,
        req.body.book_description,
        req.body.book_author
    ]
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Book Added")
        }
    })
})


app.post("/update_book",(req,res)=>{
    const q="update book_data set book_name=?,book_description=?,book_author=? where book_id=?"
    const value=[req.body.book_name,
        req.body.book_description,
        req.body.book_author,
        req.body.book_id]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Book Updated")
        }
    })
})




app.post("/search_book",(req,res)=>{
    const q="select * from book_data where book_name=?"
    const value=[req.body.book_name]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json(data)
        }
    })
})


app.post("/delete_book",(req,res)=>{
    const q="delete from book_data where book_id=?"
    const value=[req.body.book_id]
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Book Deleted")
        }
    })
})



app.listen(8800,()=>{
    console.log("Port has been set to localhost:8800")
})