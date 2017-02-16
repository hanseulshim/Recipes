var express = require('express')
var path = require('path')
var port = process.env.PORT || 8080
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Recipebook = require('./Recipebook.model')

var db = 'mongodb://localhost/recipebook'

mongoose.connect(db)

app.use(express.static('./dist'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
  console.log('running!')
})

app.post('/addRecipe', (req, res) => {
  var data = new Recipebook(req.body)
  data.save((err, data) => {
    err ? console.log("Error", err) : console.log("Saved", data)
  })
})

app.get('/getRecipes', (req,res) => {
  Recipebook.find((err,data) => {
     err ? console.log("Error", err) : res.send(data)
     // if(err){
     //  console.log("Error", err)
     // }
     // else{
     //  console.log("getting")
     //  console.log(data)
     //  res.send(data)
     // }
  })
})

app.listen(port)
console.log('Server started on: ' + port)