"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const room_model_1 = require("./room.model");
const searchAbleField_1 = require("./searchAbleField");
const createRoom = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.create(payLoad);
    return result;
});
const getAllRooms = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Rooms.find();
    const roomQuery = new QueryBuilder_1.default(room_model_1.Rooms.find({ isDeleted: false }), query)
        .search(searchAbleField_1.searchAbleField)
        .filter()
        .sort()
        .limit()
        .paginate()
        .range()
        .capacity();
    // .roomsId();
    const result = yield roomQuery.modelQuery;
    const meta = yield roomQuery.countTotal();
    return { result, meta };
});
const getASingleRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findById(id);
    return result;
});
const updateRooms = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findByIdAndUpdate(id, payLoad, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteARoom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findByIdAndUpdate(payload, { isDeleted: true }, { new: true });
    return result;
});
exports.roomsServices = {
    createRoom,
    getAllRooms,
    getASingleRoom,
    updateRooms,
    deleteARoom,
};
