const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (calback) => {
    if(database){
        console.log('Database is already initialized!')
        return calback(null, database)
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            calback(null, database);
        })
        .catch((arr) => {
            calback(err);
        })
};

const getDatabase = () => {
    if(!database){
        throw Error('Database noy initialized')
    }
    return database;
}

module.exports = {initDb, getDatabase};