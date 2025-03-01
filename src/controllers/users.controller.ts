import { RequestHandler, Response } from "express";
import {
  getUsersService,
  loginUserService,
  registerUserService,
} from "../services/users.service.js";
import { AuthenticatedUser } from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export const getUsers: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<Omit<AuthenticatedUser, "password">[]> | undefined> => {
  try {
    const result = await getUsersService(req);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const registerUser: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<AuthenticatedUser> | undefined> => {
  try {
    const result = await registerUserService(req);
    if (result.isError) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (
  req,
  res,
  next
): Promise<Response<AuthenticatedUser> | undefined> => {
  try {
    const result = await loginUserService(req);
    if (result.isError) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
