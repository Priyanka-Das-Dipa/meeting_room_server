"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorSource = Object.values(error.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    const statusCode = 5000;
    return {
        statusCode,
        message: "Validation Error",
        errorSource,
    };
};
exports.default = handleValidationError;
