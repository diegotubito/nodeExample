require('./config/config.js');
const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser')

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuarios.js'));

app.listen(port, () => {
  console.log(`escuchando peticiones por puerto ${port}`);
});
