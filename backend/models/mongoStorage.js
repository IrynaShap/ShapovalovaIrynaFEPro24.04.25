require('dotenv').config();
const { MongoClient } = require("mongodb");

class MongoStorage {
    constructor({ uri = process.env.MONGO_URI, dbName = process.env.MONGO_DB_NAME, collectionName = process.env.COLLECTION_NAME } = {}) {
        this.uri = uri;
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.client = null;
        this.db = null;
        this.collection = null;
    }

    async _connect() {
        if (!this.db) {
            if (!this.client) {
                this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
                await this.client.connect();
                this.db = this.client.db(this.dbName);
                this.collection = this.db.collection(this.collectionName);
                console.log("Connected to MongoDB");
            }
        }
        return this.collection;
    }

    async getAll() {
        const collection = await this._connect();
        return collection.find({}).toArray();
    }

    async insert(data) {
        const collection = await this._connect();
        const result = await collection.insertOne(data);
        return { ...data, _id: result.insertedId };
    }

    async deleteById(id) {
        console.log('mongoStorage.deleteById called with id:', id);
        const collection = await this._connect();
        try {
            const objectId = MongoStorage.toObjectId(id);
            console.log('Converted ObjectId:', objectId);
            const result = await collection.findOneAndDelete({ _id: objectId });
            console.log('MongoDB delete result:', result);
            return result._id || false;
        } catch (error) {
            console.error('MongoDB delete error:', error);
            return null;
        }
    }

    async updateById(id, data) {
        const collection = await this._connect();
        const objectId = MongoStorage.toObjectId(id);
        console.log('Updating document with ID:', objectId, 'Data:', data);
        const { _id, ...updateData } = data;
        console.log('Update data without _id:', updateData);
        const result = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        console.log('MongoDB update result:', result);
        return result._id || false;
    }

    static toObjectId(id) {
        const { ObjectId } = require('mongodb');
        console.log('Converting ID to ObjectId:', id, typeof id);

        try {
            if (ObjectId.isValid(id)) {
                return new ObjectId(id);
            } else {
                throw new Error(`Invalid ObjectId: ${id}`);
            }
        } catch (error) {
            console.error('ObjectId conversion error:', error);
            throw error;
        }
    }
}

module.exports = { MongoStorage };
