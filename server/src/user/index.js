import express from "express"
const app=express()

app.use("/",(req,res)=>{
res.json({message:"Hello"})
})

app.listen(7000,()=>{
console.log("Server listening at PORT - 8000")
})

