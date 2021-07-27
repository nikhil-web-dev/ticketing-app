import express from "express";
import { app } from "../app";
import { Ticket } from "../models/ticketing";
const router = express.Router();

router.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });
  res.send(tickets);
});

export { router as indexTicketRouter };
