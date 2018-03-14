// server.js
// where your node app starts

// init project
const validUrl = require('valid-url')
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

function getNewId() {
  return Math.floor(Math.random() * 10000)
}

let map = {}

app.get('/:id', (request, response) => {
  response.redirect(map[request.params.id])
})

app.get('/new/*', (request, response) => {
  let original = request.params[0]
  let host = request.header('host')
  if (validUrl.isWebUri(original)) {
    let id = getNewId()
    map[id] = original
    response.json({
      original_url: original,
      short_url: `https://${host}/${id}`
    })
  } else {
    response.json({
      error: 'Invalid URL'
    })
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
