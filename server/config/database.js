'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'your_mongodb_connection_string'; // replace with your MongoDB connection string

const connectToDatabase = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('your_database_name'); // replace with your database name
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
};

module.exports = connectToDatabase;