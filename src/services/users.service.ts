import bycrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../adapters/db/index.js";
import {
  AuthenticatedUser,
  LoginFormSchema,
  SYSTEM_ERRORS,
  User,
  UserRegistrationFormSchema,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export const getUsersService = async (
  req: Request
): Promise<Omit<User, "password">[]> => {
  const users = await db.selectFrom("users").selectAll().execute();

  return users.map((user) => {
    return {
      user_id: user.user_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  });
};

export const registerUserService = async (
  req: Request
): Promise<AuthenticatedUser> => {
  //@todo: Figure out way to properly type the request body
  const { username, password, confirmPassword } = req.body;

  // Validate using zod schema
  const validatedData = UserRegistrationFormSchema.safeParse({
    username,
    password,
    confirmPassword,
  });

  if (!validatedData.success) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.ZOD_SCHEMA_VALIDATION_ERROR,
      message: validatedData.error.issues[0].message,
    };
  }

  // Check if user already exists
  const existingUser = await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", username)
    .execute();

  if (existingUser.length) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.EXISTING_USER,
    };
  }

  // Encrypt the password
  const hashedPassword = await bycrypt.hash(password, 10);

  // Insert the user into the db
  const user = await db
    .insertInto("users")
    .values({
      user_id: username,
      password: hashedPassword,
    })
    .returning(["user_id", "created_at", "updated_at"])
    .executeTakeFirst();

  // Check if user was inserted
  if (!user) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.DB_INSERT_ERROR,
    };
  }

  return {
    isError: false,
    user_id: user.user_id,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

export const loginUserService = async (
  req: Request
): Promise<AuthenticatedUser> => {
  //@todo: Figure out way to properly type the request body
  const { username, password } = req.body;

  // Validate using zod schema
  const validatedData = LoginFormSchema.safeParse({ username, password });
  if (!validatedData.success) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.ZOD_SCHEMA_VALIDATION_ERROR,
      message: validatedData.error.issues[0].message,
    };
  }

  const user = await db
    .selectFrom("users")
    .where("user_id", "=", username)
    .selectAll()
    .executeTakeFirst();

  // Check if user exists
  if (!user) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.USER_NOT_FOUND,
    };
  }

  // Check if password is correct
  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.INVALID_PASSWORD,
    };
  }

  return {
    isError: false,
    user_id: user.user_id,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
