import { describe, it, expect } from 'vitest';
import type { User } from '$lib/models/userSchema';
import { connectToDatabase, addUser, findUser, getAllUsers, deleteUser, updateUser } from '.';

describe('Database Connection', () => {
	it('connect to database', async () => {
		const db = await connectToDatabase();
		expect(db).toBeDefined();
	});
});

describe('Add User Test', () => {
	it('Adding user', async () => {
		const user: User = {
			user_id: '12345',
			name: 'David',
			email: 'davidveridiano@gmail.com',
			picture:
				'https://i.guim.co.uk/img/media/b1c2204dd6df26a106b43ab91b19a523aba91f3a/0_0_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ccb8c1e65aed8c6e8455311cd3422453',
			bio: 'wahahaha'
		};

		const userID = await addUser(user);
		expect(userID).toBeTruthy();
	});
});

describe('Find User Test', () => {
	it('Finding a user', async () => {
		const userID = '65432';
		const foundUser = await findUser(userID);

		if (foundUser) {
			console.log('User Found: ', foundUser);
			expect(foundUser.user_id).toBe(userID);
			//expect(foundUser.user_id).not.to.equal(userID);
		} else {
			console.log('No user found');
			expect(foundUser).toBeNull;
		}
	});
});

describe('Find all Users Test', () => {
	it('gets all current users', async () => {
		const all_users = await getAllUsers();

		if (all_users && all_users.length > 0) {
			console.log('All current users: ', all_users);
			expect(all_users).toBeDefined();
		} else {
			console.log('Error');
			expect(all_users).toBeNull();
		}
	});
});

describe('Delete user Test', () => {
	it('deletes specified user', async () => {
		const userID = '12345';
		const result = await deleteUser(userID);

		if (result == false) {
			console.log('No user with specified ID found');
		} else {
			expect(result).toBeTruthy();
		}
	});
});

describe('Update user Test', () => {
	it('Updates user information fields', async () => {
		const userID = '12345';
		const updateInfo = { name: 'David Alcala', bio: 'WAHAHAHAHAH bruh' };
		const result = await updateUser(userID, updateInfo);

		if (result == false) {
			console.log('No user with specified ID found');
		} else {
			console.log('User updated successfully');
			expect(result).toBeTruthy();
		}
	});
});
