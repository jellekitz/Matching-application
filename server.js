const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(express.static(path.join(__dirname, 'static/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/index.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/register.html'));
})

app.get('/myAccount', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/myAccount.html'));
})

app.get('*', function(req, res){
    res.send('404 not found', 404);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})