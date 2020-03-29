const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../model/usuarios');

const mongoose = require('mongoose');
mongoose.connect(process.env.URLDB,
{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
, (err) => {

    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
         throw err;
    }
    console.log('DB Connected...');
});

app.get('/', function (req, res) {
  res.json({
    respuesta: "ejemplo de respuesta"
  });
});

app.get('/usuario', function (req, res) {
  let query = req.query;
  let limit = query.limit;
  limit = Number(limit);

  let from = query.from || 0;
  from = Number(from);

  Usuario.find({}, 'nombre email')
  .skip(from)
  .limit(limit)
  .exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        status : 400,
        description : 'Bad request',
        errorMessage : err
      });
    }

    Usuario.countDocuments({}, (err, count) => {
      res.json({
        status : 200,
        usuarios: usuarios,
        count: count
      });
    });

  });
})

app.post('/usuario', function (req, res) {

  let body = req.body;
  let usuario = new Usuario({
    nombre : body.nombre,
    email : body.email,
    password : bcrypt.hashSync(body.password, 10),
    role : body.role
  });

  usuario.save((err, newUser) => {
    if (err) {
      return res.status(400).json({
        status : 400,
        description : 'Bad request',
        errorMessage : err
      });
    }



    res.json({
      status : 200,
      usuario: newUser
    });

  });
})

app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'role']);

  Usuario.findByIdAndUpdate(id, body, { new : true, runValidators : true }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        status : 400,
        description : 'Bad request',
        errorMessage : err
      });
    }

      res.json({
        status : 200,
        usuario: usuarioDB
      });
  });
})

app.delete('/usuario/:id', function (req, res) {

  let id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, removedUser) => {
    if (err) {
      return res.status(400).json({
        status : 400,
        description : 'Bad request',
        errorMessage : err
      });
    }

    if (!removedUser) {
      res.json ({
        status: 400,
        message: 'Usuario no encontrado'
      });
    }

      res.json({
        status : 200,
        removedUser: removedUser
      });

  });

});

module.exports = app;
