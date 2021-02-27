const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const objectID = require('mongodb').objectID
const assert = require('assert')

const dbName = process.env.DB_NAME

const url = process.env.MONGODB_URL

// urlencodedParser variabele voor middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false })



// home pagina

router.get('/', function (req, res) {
    res.render('pages/index')
})



// register pagina


// renderen van pagina register
router.get('/register', function (req, res) {
    res.render('pages/register')
})

// Data naar de database inserten
router.post('/register', urlencodedParser, function (req, res) {
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(dbName);
        db.collection('users').insertOne(userInfo, function () {
            assert.equal(null, err)
            console.log('gebruiker toegevoegd')
            client.close()
        })
    })

    res.render('pages/account', { userInfo: req.body })
})



// login pagina


router.get('/login', function (req, res) {
    res.render('pages/login')
})



// account pagina 


// get (vinden van de gebruiker die zojuist is geregistreerd)
router.get('/account', function (req, res) {
    const resultArray = {}
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err)
        const cursor = db.collection('users').find()
        cursor.forEach(function (doc, err) {
            assert.equal(null, err)
            resultArray.push(doc)
        }, function () {
            client.close()
            res.render('pages/account', { userInfo: resultArray })
        })
    })
})

// update
router.post('/update', function (req, res) {
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
    }

    const id = req.body.id

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(dbName);
        db.collection('users').updateOne({ "_id": objectID(id) }, { $set: userInfo }, function () {
            assert.equal(null, err)
            console.log('gebruiker aangepast')
            client.close()
        })
    })
})

// delete
router.post('/account', function (req, res) {
    const id = req.body.id

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err)
        const db = client.db(dbName);
        db.collection('users').deleteOne({ "_id": objectID(id) }, function () {
            assert.equal(null, err)
            console.log('gebruiker verwijderd')
            client.close()
        })
    })
})



// resultaten pagina (hier komen de resulaten van het filteren)

router.get('/result', function (req, res) {
    res.render('pages/result')
})



module.exports = router;