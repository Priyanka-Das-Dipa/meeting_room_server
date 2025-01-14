"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const errorSource = [
        {
            path: "",
            message: `${error.errormessage} is already Exist`,
        },
    ];
    const statusCode = 500;
    return {
        statusCode,
        message: error === null || error === void 0 ? void 0 : error.message,
        errorSource: errorSource,
    };
};
exports.default = handleDuplicateError;
