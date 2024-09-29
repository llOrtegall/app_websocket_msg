import { z } from 'zod';

const UserSchema = z.object({
  names: z.string().min(2).max(40),
  lastnames: z.string().min(2).max(40),
  email: z.string().email(),
  password: z.string().min(8).max(120)
});

export type User = z.infer<typeof UserSchema>;

export const validateUseer = (data: unknown): Promise<User> => {
  return UserSchema.parseAsync(data);
};