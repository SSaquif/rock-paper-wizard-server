import { RequestHandler, Response } from "express";
import {
  getUserSessionFromCookieService,
  getUsersService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from "../services/users.service.js";
import {
  APIErrorResponse,
  AuthenticatedSession,
  AuthenticatedUser,
  User,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { typedResponse } from "../helpers/typedResponse.js";

export const getUsers: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<Omit<User, "password">[]>> => {
  try {
    const result = await getUsersService(req);
    return typedResponse<Omit<User, "password">[]>(res, 200, result);
  } catch (error) {
    next(error);
    throw error; // satisfies return type
  }
};

export const registerUser: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<AuthenticatedUser>> => {
  try {
    const result = await registerUserService(req);
    if (result.isError) {
      return typedResponse<AuthenticatedUser>(res, 400, result);
    }
    // Set the session cookie
    res.cookie("session_id", result.session.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(result.session.session_expires_at),
    });
    return typedResponse<AuthenticatedUser>(res, 201, result);
  } catch (error) {
    next(error);
    throw error; // satisfies return type
  }
};

export const loginUser: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<AuthenticatedUser>> => {
  try {
    const result = await loginUserService(req);
    if (result.isError) {
      return typedResponse<AuthenticatedUser>(res, 400, result);
    }

    // Set the session cookie
    res.cookie("session_id", result.session.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(result.session.session_expires_at),
    });
    return typedResponse<AuthenticatedUser>(res, 200, result);
  } catch (error) {
    next(error);
    throw error; // satisfies return type
  }
};

export const getUserSessionFromCookie: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<AuthenticatedSession>> => {
  try {
    const result = await getUserSessionFromCookieService(req);
    if (result.isError) {
      return typedResponse<AuthenticatedSession>(res, 401, result);
    }
    return typedResponse<AuthenticatedSession>(res, 200, result);
  } catch (error) {
    next(error);
    throw error; // satisifies return type
  }
};

export const logoutUser: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<APIErrorResponse> | void> => {
  try {
    const result = await logoutUserService(req);
    if (result.isError) {
      return typedResponse<APIErrorResponse>(res, 400, result);
    }
    // Clear the session cookie
    return res.clearCookie("session_id", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    next(error);
    throw error; // satisfies return type
  }
};
