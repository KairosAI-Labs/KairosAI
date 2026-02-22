import z from "zod";

export  const inputUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  time: z.string().min(1),
  summary: z.string().max(300).min(1),
});

export type inputUserData = z.infer<typeof inputUserSchema>;
