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
  const addedTopping = request.body.topping;
  db.collection(collection).insertOne({topping: request.body.topping, likes: 1})
  .then(result => {
      console.log('Added topping:', addedTopping)
      response.redirect('/')
  })
  .catch(error => console.error(error))
})

app.put('/updateLike', (request, response) => {
  console.log('request',request.body)
  const newCount = request.body._vote === "up" ? request.body.likes + 1 : request.body.likes - 1

  db.collection(collection).findOneAndUpdate(
    { "topping": request.body.topping },
    { $set: { "likes": newCount } },
    { upsert: true, sort: { _id: -1 } }
  )
  .then( result => {
    console.log('Updated vote for', request.body.topping,'to',newCount)
    response.json('Like updated')
  })
  .catch(error => console.error(error))
})

app.delete('/deleteTopping', (request,response) => {
  const removedTopping = request.body.toppingToDelete
  db.collection(collection).deleteOne({topping: removedTopping})
  .then(result => {
    console.log('Removed topping:', removedTopping)
    response.json(`${removedTopping} topping removed`)
  })
  .catch(error => console.error(error))
})

///////// LISTENER /////////////////////////////////////
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on ${PORT}`)
}) 