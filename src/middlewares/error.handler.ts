import { SYSTEM_ERRORS } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { ErrorRequestHandler } from "express";

// todo: consider setting up a Monad to handle errors

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  // todo: consider logging the error to a file or db or slack/discord channel
  console.error(err.message);
  console.error(err.stack);
  next(err);
};

export const clientErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (req.xhr) {
    return res.status(500).json({ error: SYSTEM_ERRORS.GENERIC_ERROR });
  } else {
    next(error);
  }
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).json({ message: err.message });
};
