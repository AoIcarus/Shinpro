// Fields Rquires; Display name, First name, Last name, Email, Bio(Optional), Photo(Optional), locale, userID
import { z } from 'zod';

export const userSchema = z.object({
	user_id: z.string().min(1).max(255),
	name: z.string().max(64),
	email: z.string().max(40),
	picture: z.string().url(),
	bio: z.string()
});

export type User = z.infer<typeof userSchema>;
