const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
let schema = mongoose.Schema;

let validRoles = {
  values : ['USER_ROLE', 'ADMIN_ROLE'],
  message : '{VALUE} no es un rol valido'
}

let usuarioSchema = new schema({
   nombre : {
     type : String,
     required : [true, 'Parameter name is required.']
   },
   email : {
     type : String,
     unique : true,
     required : [true, 'Parameter email is required.']
   },
   password : {
     type : String,
     required : [true, 'Parameter name is required.']
   },
   role : {
     type : String,
     default : "USER_ROLE",
     enum : validRoles
   }

});

usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

usuarioSchema.plugin( validator, {message : '{PATH} debe de ser unico'} )

module.exports = mongoose.model('Usuario', usuarioSchema);
