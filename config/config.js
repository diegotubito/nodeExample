// CONFIGURE PORT NUMBER

process.env.PORT = process.env.PORT || 3000


//ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//DATABASE

let urlDB;

//if (process.env.NODE_ENV === 'dev') {
//  urlDB = 'yourlocalMondoDB';
//} else {
  urlDB = 'mongodb+srv://cafe:admin1234@cluster0-jfb6n.mongodb.net/test';
//}

//nos creamos una variable global
process.env.URLDB = urlDB;
