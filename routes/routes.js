const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb")
require('dotenv').config()
const url = process.env.MONGODB_URL
const client = new MongoClient(url, { useUnifiedTopology: true })
const ObjectID = require('mongodb').ObjectID
// const assert = require('assert')



// Database
const dbName = process.env.DB_NAME

async function run() {
    try {
        await client.connect()
        console.log("Connected correctly to server")
        const db = client.db(dbName)
    } catch (err) {
        console.error(err.stack)
    }
    return client
}
run().catch(console.dir)



// urlencodedParser variabele voor middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false })



// home pagina

router.get('/', function (req, res) {
    res.render('pages/index')
})



// register pagina


// renderen van pagina register
router.get('/register', urlencodedParser, function (req, res) {
    res.render('pages/register')
})

// Data naar de database inserten
router.post('/account', urlencodedParser, function (req, res) {
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
    }

    const db = client.db(dbName)

    db.collection('users').insertOne(userInfo, function () {
        console.log(userInfo.name, 'toegevoegd')
        client.close()
    })
    res.render('pages/account', { userInfo: req.body })
})



// login pagina


router.get('/login', function (req, res) {
    res.render('pages/login')
})



// account pagina 

// router.get('/account', function (req, res) {
//     res.render('pages/account', { userInfo: req.body })
// })

// get (vinden van de gebruiker die zojuist is geregistreerd)
// router.get('/account', function (req, res) {
//     const resultArray = {}
//     MongoClient.connect(url, function (err, client) {
//         assert.equal(null, err)
//         const cursor = db.collection('users').find()
//         cursor.forEach(function (doc, err) {
//             assert.equal(null, err)
//             resultArray.push(doc)
//         }, function () {
//             client.close()
//             res.render('pages/account', { userInfo: resultArray })
//         })
//     })
// })

// update
router.post('/account/update', urlencodedParser, function (req, res) {
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
    }

    const db = client.db(dbName)

    const ObjectID = require('mongodb').ObjectID

    db.collection('users').updateOne({ "_id": ObjectID(req.body._id) }, { $set: userInfo }, { upsert: true }, function () {
        console.log(userInfo.name, 'geupdate')
        res.redirect('/account')
        client.close()
    })
})

// delete
router.post('/account/delete', urlencodedParser, function (req, res) {
    const db = client.db(dbName)

    const ObjectID = require('mongodb').ObjectID

    db.collection('users').deleteOne({ "_id": ObjectID(req.body._id) }, function () {
        console.log('deleted')
        res.redirect('/')
        client.close()
    })
})



// resultaten pagina (hier komen de resulaten van het filteren)

router.get('/result', function (req, res) {
    res.render('pages/result')
})



module.exports = router;