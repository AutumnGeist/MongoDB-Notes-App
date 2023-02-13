//import .env
require('dotenv').config()
//import express
const express = require('express')
//import mongoose for DB
const mongoose = require('mongoose')
//import method-override
const methodOverride = require('method-override')
//import DB schema
const Note = require("./models/Note")
//import routes
const routes = require("./routes")

//setup to use express, middleware, routes, public static files (.css)
const app = express()
//Middleware for DELETE and PUT requests
app.use(methodOverride('_method'))
//Middleware to accept data in JSON (MUST COME BEFORE ROUTES)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Set to use routes and static files in the public folder
app.use(routes)
app.use('/public', express.static('public'))

//DB setup
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        const conn = await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
        console.log(`MongoDB connected: ${conn.connection.host}`)
        const db = mongoose.connection
        db.on('error', error => console.error(error))
        db.once('open', () => console.log('Connected to Mongoose'))
    } catch (error) {
        console.log(error)
    }
}

//set view engine to ejs
app.set('view engine', 'ejs')
//set where views are coming from, in this case gets current directory + /views folder
app.set('views', __dirname + '/views')

//tell app to listen on specific port after the DB connection has been established
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("listening for requests")
    })
})




