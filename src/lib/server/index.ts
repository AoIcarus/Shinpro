import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string if different
const dbName = 'Shinpro'; // The name of the database you want to create

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
	if (db) {
		return db;
	}

	const client = new MongoClient(url);
	await client.connect();

	console.log('Connected to MongoDB');

	db = client.db(dbName);
	return db;
};

export const getDatabase = (): Db => {
	if (!db) {
		throw new Error('Database not initialized. Call connectToDatabase first.');
	}
	return db;
};
