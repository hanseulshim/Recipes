var express = require('express')
var path = require('path')
var port = process.env.PORT || 8080
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Recipebook = require('./Recipebook.model')

var db = 'mongodb://localhost/recipebook'

mongoose.connect(process.env.MONGOLAB_URL || db)

app.use(express.static('./dist'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
  console.log('running!')
})

app.post('/addRecipe', (req, res) => {
  var data = new Recipebook(req.body)
  data.save((err, data) => {
    err ? console.log('Error in add', err) : res.send(data)
  })
})

app.get('/getRecipes', (req, res) => {
  Recipebook.find((err, data) => {
    err ? console.log('Error in get', err) : res.send(data)
  })
})

app.post('/updateRecipe', (req, res) => {
  var searchName = req.body.searchName
  var newName = req.body.newName
  var ingredients = req.body.ingredients
  Recipebook.update({name: searchName}, {$set: { name: newName, ingredients: ingredients }}, (err, data) =>
    err ? console.log('Error in delete', err) : res.send(data)
  )
})

app.post('/deleteRecipe', (req, res) => {
  var name = req.body.name
  Recipebook.find({name: name}).remove((err, data) =>
    err ? console.log('Error in delete', err) : res.send(data)
  )
})

app.listen(port)
console.log('Server started on: ' + port)
