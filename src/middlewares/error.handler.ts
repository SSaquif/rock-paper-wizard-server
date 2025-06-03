import { SYSTEM_ERRORS } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { ErrorRequestHandler } from "express";

// @todo: consider setting up a Monad to handle errors
// @todo: maybe improve the typing of the error response object

//@todo: need to check if this error handling works
//The way I am handling my endpoints right now
//It might not be working as expected
export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  //@todo: consider logging the error to a file or db or slack/discord channel
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
  //@todo: needs fixing I thinks this will always hit
  if (req.xhr) {
    return res.status(500).json({
      isError: true,
      error: SYSTEM_ERRORS.BAD_REQUEST,
      detail: req.errored,
    });
  } else {
    next(error);
  }
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).json({
    isError: true,
    error: SYSTEM_ERRORS.GENERIC_ERROR,
    message: err.message,
    detail: req.errored,
  });
};
