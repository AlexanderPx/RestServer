//puerto
process.env.PORT = process.env.PORT || 3000


//Entorno


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Entorno
//60 segundos
//60 minutos
process.env.CADUCIDAD_TOKEN = 60 * 60;


//Entorno
process.env.CADUCIDAD_SEED = process.env.CADUCIDAD_SEED || 'seed-desarrollo';

//BAse de datos

let urlDB;

if (process.eventNames.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'

} else {
    urlDB = 'mongodb+srv://cafe-user:uvgpA5yufQm7L0aO@cafe.bsqco.mongodb.net/cafe'
}

process.env.URLDB = urlDB;