require('./config/config.js');
const port = process.env.PORT;
const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function (req, res) {
  res.send('GET usuario')
})

app.post('/usuario', function (req, res) {
  console.log(req.body);
  res.send(req.body)
})

app.put('/usuario', function (req, res) {
  res.send('PUT usuario')
})

app.delete('/usuario', function (req, res) {
  res.send('DELETE usuario')
})

app.listen(port, () => {
  console.log(`escuchando peticiones por puerto ${port}`);
});
