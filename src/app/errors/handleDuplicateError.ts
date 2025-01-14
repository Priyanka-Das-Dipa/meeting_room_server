import { TErrorSources } from "../interface/error";

const handleDuplicateError = (error: any) => {
  const errorSource: TErrorSources = [
    {
      path: "",
      message: `${error.errormessage} is already Exist`,
    },
  ];
  const statusCode = 500;
  return {
    statusCode,
    message: error?.message,
    errorSource: errorSource,
  };
};
export default handleDuplicateError;
