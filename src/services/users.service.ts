import bycrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../adapters/db/index.js";
import { addHours } from "date-fns";
import {
  AuthenticatedSession,
  AuthenticatedUser,
  LoginFormSchema,
  Session,
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
      is_admin: user.is_admin,
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
      is_admin: false,
    })
    .returning(["user_id", "created_at", "updated_at", "is_admin"])
    .executeTakeFirst();

  // Check if user was inserted
  if (!user) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.DB_INSERT_ERROR,
      message: "Failed to create user",
    };
  }

  // Create a session token
  const expiresAt = addHours(new Date(), 24); // 24 hours from now
  const session = await db
    .insertInto("sessions")
    .values({
      user_id: user.user_id,
      is_admin: user.is_admin,
      expires_at: expiresAt,
    })
    .returningAll()
    .executeTakeFirst();

  if (!session) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.DB_INSERT_ERROR,
      message: "Failed to create session",
    };
  }

  return {
    isError: false,
    user: {
      user_id: user.user_id,
      is_admin: user.is_admin,
      user_updated_at: user.updated_at,
      user_created_at: user.created_at,
    },
    session: {
      session_id: session.session_id,
      session_created_at: session.created_at,
      session_updated_at: session.updated_at,
      session_expires_at: session.expires_at,
    },
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

  // create a session token
  const expiresAt = addHours(new Date(), 24); // 24 hours from now
  const session = await db
    .insertInto("sessions")
    .values({
      user_id: user.user_id,
      is_admin: user.is_admin,
      expires_at: expiresAt,
    })
    .returningAll()
    .executeTakeFirst();

  if (!session) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.DB_INSERT_ERROR,
      message: "Failed to create session",
    };
  }

  return {
    isError: false,
    user: {
      user_id: user.user_id,
      is_admin: user.is_admin,
      user_updated_at: user.updated_at,
      user_created_at: user.created_at,
    },
    session: {
      session_id: session.session_id,
      session_created_at: session.created_at,
      session_updated_at: session.updated_at,
      session_expires_at: session.expires_at,
    },
  };
};

export const getUserSessionFromCookieService = async (
  req: Request
): Promise<AuthenticatedSession> => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.SESSION_ID_NOT_PROVIDED,
      message: "No session ID provided in the request cookie",
    };
  }

  const session = await db
    .selectFrom("sessions")
    .where("session_id", "=", sessionId)
    .selectAll()
    .executeTakeFirst();

  if (!session || new Date() > new Date(session.expires_at)) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.SESSION_EXPIRED,
    };
  }

  return {
    isError: false,
    session,
  };
};
