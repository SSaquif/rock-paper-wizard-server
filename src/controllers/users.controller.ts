import { RequestHandler } from "express";
import {
  getUserSessionFromCookieService,
  getUsersService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from "../services/users.service.js";
import {
  APIErrorResponse,
  APISuccessResponse,
  AuthenticatedSession,
  AuthenticatedUser,
  SUCCESS_MESSAGES,
  User,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { typedResponse } from "../helpers/typedResponse.js";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await getUsersService(req);
    return typedResponse<Omit<User, "password">[]>(res, 200, result);
  } catch (error) {
    next(error);
    throw error;
  }
};

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await registerUserService(req);
    if (result.isError) {
      return typedResponse<APIErrorResponse>(res, 400, result);
    }
    // Set the session cookie
    res.cookie("session_id", result.session.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(result.session.session_expires_at),
    });
    // returns th response with the cookie
    return typedResponse<APISuccessResponse>(res, 201, {
      isError: false,
      message: SUCCESS_MESSAGES.USER_REGISTERED,
    });
  } catch (error) {
    next(error);
    throw error;
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
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
    // returns the response with the cookie
    return typedResponse<APISuccessResponse>(res, 200, {
      isError: false,
      message: SUCCESS_MESSAGES.USER_LOGGED_IN,
    });
  } catch (error) {
    next(error);
    throw error;
  }
};

export const getUserSessionFromCookie: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result = await getUserSessionFromCookieService(req);
    if (result.isError) {
      return typedResponse<AuthenticatedSession>(res, 401, result);
    }
    return typedResponse<AuthenticatedSession>(res, 200, result);
  } catch (error) {
    next(error);
    throw error;
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await logoutUserService(req);
    if (result.isError) {
      return typedResponse<APIErrorResponse>(res, 400, result);
    }
    // Clear the session cookie and set the response cookie header
    res.clearCookie("session_id", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    // send the response
    return typedResponse<APISuccessResponse>(res, 200, {
      isError: false,
      message: SUCCESS_MESSAGES.USER_LOGGED_OUT,
    });
  } catch (error) {
    next(error);
    throw error;
  }
};
