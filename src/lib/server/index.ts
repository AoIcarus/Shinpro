import type { User } from '$lib/models/userSchema';
import { MongoClient, Db } from 'mongodb';
import errorMap from 'zod/locales/en.js';

const url =
	'mongodb+srv://davidveridiano:KdQyMRYB7JrofESL@cluster0.j4ucw2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string if different
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

export async function addUser(create: User) {


	const db = await getDatabase();

	try{
		const collection = db.collection('users');
		const { insertedId } = await collection.insertOne(create);

		return insertedId;
	}
	catch (error) {
		console.error('Error Adding User: ', error);
		throw error
	}
};
