import { z } from "zod";

// Can contain only alphabets and numbers
const usernameRegex = /[^a-zA-Z0-9]/;
// Can contain only alphabets, letters, -, _
// const passwordRegex = /.{8,}/;

const newGameSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .trim()
      .regex(usernameRegex, "Username must contain only letters and numbers")
      .min(3, "Username should be at least 3 characters long")
      .max(20, "Username should be at most 20 characters long"),
    numOfPlayers: z
      .number({
        required_error: "Number of players is required",
      })
      .min(2, "Number of players should be at least 2")
      .max(6, "Number of players should be at most 6"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      // .regex(passwordRegex, "Password must contain only letters and numbers")
      .min(8, "Password should be at least 8 characters long")
      .max(100, "Password should be at most 100 characters long"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type NewGameEntry = z.infer<typeof newGameSchema>;

export default newGameSchema;
