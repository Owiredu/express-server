const { MongoClient, MongoServerError } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'test';

// Perform different types of operations
async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    try {
        // insert many documents
        const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
        console.log('Inserted documents =>', insertResult);

        // find all documents
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);

        // find documents with a query filter
        const filteredDocs = await collection.find({ a: 3 }).toArray();
        console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

        // update a document
        const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
        console.log('Updated documents =>', updateResult);

        // remove a document 
        const deleteResult = await collection.deleteMany({ a: 3 });
        console.log('Deleted documents =>', deleteResult);

        // index a collection
        const indexName = await collection.createIndex({ a: 1 });
        console.log('index name =', indexName);
    } catch (err) {
        if (err instanceof MongoServerError) {
            console.log(`Error worth logging: ${err}`);
        }
        throw err;
    }

    return 'done.';
}

// run the operations
main().then(console.error).catch(console.log).finally(() => { client.close() })