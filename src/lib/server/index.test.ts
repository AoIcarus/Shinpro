import { describe, it, expect } from 'vitest';
import type { User } from '$lib/models/userSchema';
import { connectToDatabase, addUser } from '.';

describe('Database Connection', () => {
	it('connect to database', async () => {
		const db = await connectToDatabase();
		expect(db).toBeDefined();
	});
});

describe('Add User Test', () => {
	it('Adding user', async () => {
		const user: User = {
			user_id: '65432',
			name: 'Neil',
			email: 'davidveridiano@gmail.com',
			picture:
				'https://i.guim.co.uk/img/media/b1c2204dd6df26a106b43ab91b19a523aba91f3a/0_0_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ccb8c1e65aed8c6e8455311cd3422453',
			bio: 'bruh'
		};

		const userID = await addUser(user);
		expect(userID).toBeTruthy();
	});
});
