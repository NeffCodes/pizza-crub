const { application } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'pizza-toppings',
    collection = 'toppings'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database.`)
    db = client.db(dbName)
  })

///////// MIDDLEWARES /////////////////////////////////////
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // Parses URL via qs library
app.use(express.json())

///////// ROUTES /////////////////////////////////////
app.get('/', (req, res) => {
  db.collection(collection).find().toArray()
    .then(data => {
      // console.log(data)
      res.render('index.ejs', { info: data })
    })
    .catch(error => console.log(error))
})

app.post('/addTopping', (request, response) => {
    db.collection(collection).insertOne({topping: request.body.topping, likes: 1})
    .then(result => {
        console.log('Toppping Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTopping', (request,response) => {
  const targetTopping = request.body.toppingToDelete
  db.collection(collection).deleteOne({topping: targetTopping})
  .then(result => {
    console.log('Removed topping', targetTopping)
    response.json(`${targetTopping} topping removed`)
  })
  .catch(error => console.error(error))
})

///////// LISTENER /////////////////////////////////////
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on ${PORT}`)
}) 