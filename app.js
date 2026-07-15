const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

let app= Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb://annet-paul:annet123@ac-rrnjxoo-shard-00-00.bcqym4j.mongodb.net:27017,ac-rrnjxoo-shard-00-01.bcqym4j.mongodb.net:27017,ac-rrnjxoo-shard-00-02.bcqym4j.mongodb.net:27017/blogAppDb?ssl=true&replicaSet=atlas-stpu0i-shard-0&authSource=admin&appName=Cluster0")

app.post("/signup",async(req,res)=> {
    
    let input=req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword

   userModel.find({email:req.body.email}).then(
    (items) => {
        
    if (items.length>0) {
            
            res.json({"status":"email Id already exists"})

        } else {

            let result= new userModel(input)
            result.save()
            res.json({"status":"success"})

        }
        
    }
   ).catch(
    (error) =>{}
   )

    
})

app.listen(3030,()=>{
    console.log("Server Started")
})