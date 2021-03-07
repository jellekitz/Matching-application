const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const router = require('./routes/routes.js')

// ejs view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// static files
app.use(express.static(path.join(__dirname, 'static/public')))

// router files
app.use('/', router)

app.listen(port, function (req, res) {
    console.log(`Matching-application listening at http://localhost:${port}`)
})
