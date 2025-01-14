import express from "express";
import { userRouters } from "../modules/User/user.router";
import { bookingsRouter } from "../modules/Booking/booking.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: bookingsRouter,
  },
  {
    path: "/users",
    route: userRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
