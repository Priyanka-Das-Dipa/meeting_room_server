"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const mongoose_1 = require("mongoose");
const globalErrorhandler = (err, req, res) => {
    let statusCode = err.statusCode ? err.statusCode : 500;
    let message = "Something went wrong";
    let errorMessages = [
        {
            path: "",
            message: "Something went wrong! Check again..",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedZodError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedZodError.statusCode;
        message = simplifiedZodError.message;
        errorMessages = simplifiedZodError === null || simplifiedZodError === void 0 ? void 0 : simplifiedZodError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simpliFiedError = (0, handleValidationError_1.default)(err);
        statusCode = simpliFiedError.statusCode;
        message = simpliFiedError.message;
        errorMessages = simpliFiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorSource;
    }
    else if (err instanceof mongoose_1.Error) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    if (err instanceof AppError_1.default) {
        return (statusCode).json({
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
        stack: config_1.default.node_env === "development" && (err === null || err === void 0 ? void 0 : err.stack),
    });
};
exports.default = globalErrorhandler;
