import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleCastError = (error: mongoose.Error.CastError) => {
    const errorSource: TErrorSources = [
      {
        path: error?.path,
        message: error.message,
      },
    ];
    const statusCode = 500;
    return {
      statusCode,
      message: "Invalid ID",
      errorSource: errorSource,
    };
  };
  export default handleCastError;