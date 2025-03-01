import bycrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../adapters/db/index.js";
import {
  AuthenticatedUser,
  SYSTEM_ERRORS,
  User,
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
  const { user_id, password, confirm_password } = req.body;
  // @todo: Remove Duplicate Validation if the Zod validation is working
  if (password !== confirm_password) {
    return {
      error: SYSTEM_ERRORS.PASSWORD_MISMATCH,
      isError: true,
    };
  }

  // Check if user already exists
  const existingUser = await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", user_id)
    .execute();

  if (existingUser.length) {
    return {
      error: SYSTEM_ERRORS.EXISTING_USER,
      isError: true,
    };
  }

  // encrypt the password
  const hashedPassword = await bycrypt.hash(password, 10);

  const user = await db
    .insertInto("users")
    .values({
      user_id,
      password: hashedPassword,
    })
    .returning(["user_id", "created_at", "updated_at"])
    .executeTakeFirst();

  if (!user) {
    return {
      error: SYSTEM_ERRORS.DB_INSERT_ERROR,
      isError: true,
    };
  }

  return {
    user_id: user.user_id,
    created_at: user.created_at,
    updated_at: user.updated_at,
    isError: false,
  };
};

export const loginUserService = async (
  req: Request
): Promise<AuthenticatedUser> => {
  const { user_id, password } = req.body;
  const user = await db
    .selectFrom("users")
    .where("user_id", "=", user_id)
    .selectAll()
    .executeTakeFirst();

  // check if user exists
  if (!user) {
    return {
      error: SYSTEM_ERRORS.USER_NOT_FOUND,
      isError: true,
    };
  }

  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    return {
      error: SYSTEM_ERRORS.INVALID_PASSWORD,
      isError: true,
    };
  }

  return {
    user_id: user.user_id,
    created_at: user.created_at,
    updated_at: user.updated_at,
    isError: false,
  };
};
