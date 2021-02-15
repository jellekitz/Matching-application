const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
    const user = [
        { name: 'Jelle' }
    ];
    res.render('pages/index', {
        user: user
    });
});

module.exports = router;