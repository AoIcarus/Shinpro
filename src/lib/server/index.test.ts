import { describe, it, expect } from 'vitest';
import { connectToDatabase } from '.';

describe('Database Connection', () => {
	it('connect to database', async () => {
		const db = await connectToDatabase();
		expect(db).toBeDefined();
	});
});

describe
