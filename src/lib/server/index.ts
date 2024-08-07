import type { User } from '$lib/models/userSchema';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { string } from 'zod';
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
	const db = getDatabase();

	try {
		const collection = db.collection('users');
		const { insertedId } = await collection.insertOne(create);

		return insertedId;
	} catch (error) {
		console.error('Error Adding User: ', error);
		throw error;
	}
}

export async function findUser(userId: string) {
	const db = getDatabase();

	try {
		const collection = db.collection('users');
		const user = await collection.findOne({ user_id: userId });

		return user;
	} catch (error) {
		console.error('Error Fetching User: ', error);
		throw error;
	}
}

export async function getAllUsers() {
	const db = getDatabase();

	try {
		const collection = db.collection('users');
		const users = await collection.find({}).toArray();

		return users;
	} catch (error) {
		console.error('Error Fetching User: ', error);
		throw error;
	}
}

export async function deleteUser(userId: string) {
	const db = getDatabase();

	try {
		const collection = db.collection('users');
		const result = await collection.deleteOne({ user_id: userId });

		if (result.deletedCount == 0) {
			return false;
		}

		return true;
	} catch (error) {
		console.error('Error Fetching User: ', error);
		throw error;
	}
}

export async function updateUser(userId: string, updates: Record<string, any>) {
	const db = getDatabase();

	try {
		const collection = db.collection('users');
		const update = await collection.updateOne({ user_id: userId }, { $set: updates });

		if (update.matchedCount == 0) {
			return false;
		}

		return true;
	} catch (error) {
		console.error('Error Updating User: ', error);
		throw error;
	}
}
