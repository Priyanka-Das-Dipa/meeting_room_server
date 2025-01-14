import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorSource: TErrorSources = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );
  const statusCode = 5000;
  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};
export default handleValidationError;
