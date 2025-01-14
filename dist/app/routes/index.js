"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/User/user.router");
const booking_route_1 = require("../modules/Booking/booking.route");
const room_route_1 = require("../modules/Room/room.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // Booking route
    {
        path: "/",
        route: booking_route_1.bookingsRouter,
    },
    //   room routes
    {
        path: "/rooms",
        route: room_route_1.roomRoutes,
    },
    //   user routes
    {
        path: "/users",
        route: user_router_1.userRouters,
    },
    //   auth routes
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    //   user routes
    {
        path: "/users",
        route: user_router_1.userRouters,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
