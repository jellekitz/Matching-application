const { MongoClient } = require("mongodb")
require('dotenv').config()
const url = process.env.MONGODB_URL
const client = new MongoClient(url)

// The database to use
const dbName = process.env.DB_NAME

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "users"
        const col = db.collection("users");

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }

}
run().catch(console.dir);