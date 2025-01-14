"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSource = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
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
exports.default = handleCastError;
