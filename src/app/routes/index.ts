import express from "express";
import { userRouters } from "../modules/User/user.router";
import { bookingsRouter } from "../modules/Booking/booking.route";
import { roomRoutes } from "../modules/Room/room.route";
import { authRoutes } from "../modules/Auth/auth.route";
import { slotRoute } from "../modules/Slot/slot.route";

const router = express.Router();

const moduleRoutes = [
  // Booking route
  {
    path: "/",
    route: bookingsRouter,
  },
  //   room routes
  {
    path: "/rooms",
    route: roomRoutes,
  },
  // slots
  {
    path: "/slots",
    route: slotRoute,
  },
  //   user routes
  {
    path: "/users",
    route: userRouters,
  },
  //   auth routes
  {
    path: "/auth",
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
