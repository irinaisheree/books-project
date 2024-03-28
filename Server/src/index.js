const expressConfig = require("./config/expressConfig")
const express = require("express")
const mongoose = require("mongoose")
const router = require('./controllers/bookController')
const userRouter = require('./controllers/userController')
const cors = require('cors')

const bodyParser = require("body-parser")



const app = express()
expressConfig(app)
app.use(cors());

app.use(bodyParser.json({extended: true }))

// app.use((req, res,next) => {

    
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4200'),
//     res.header('Access-Control-Allow-Methods', '*'),
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


//     next()
// })

app.use(router)

app.use('/auth', userRouter)
mongoose.connect("mongodb://127.0.0.1:27017/booksProject").then(() => {console.log("DB connected succesfully.");
app.listen(3000, () => 
    console.log(`Server is listening on port ${3000}...`))
}).catch(err => console.log("Cannot connect to DB."))