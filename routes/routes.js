const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

// urlencodedParser variable for middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res){
    res.render('pages/index')
})

router.get('/register', function(req, res){
    res.render('pages/register', {qs: req.query})
})

router.post('/register', urlencodedParser, function(req, res){
    console.log(req.body)
    res.render('pages/register-succes', {data: req.body})
})

router.get('/login', function(req, res){
    res.render('pages/login')
})

router.get('/result', function(req, res){
    res.render('pages/result')
})

module.exports = router;