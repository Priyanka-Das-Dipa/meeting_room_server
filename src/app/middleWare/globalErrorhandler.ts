import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import { ErrorRequestHandler } from "express";

const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {

  console.log(err.statusCode);
  
  let statusCode = err.statusCode ? err.statusCode : 500;
  let message = "Something went wrong";
  let errorMessages: TErrorSources = [
    {
      path: "",
      message: "Something went wrong! Check again..",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedZodError = handleZodError(err);
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
    errorMessages = simplifiedZodError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simpliFiedError = handleValidationError(err);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessages = simpliFiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.erroSource;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  if (err instanceof AppError) {
    return res.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message,
      data: [],
      
    });
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    err,
    stack: config.node_env === "development" && err?.stack,
  });
};

export default globalErrorhandler;
