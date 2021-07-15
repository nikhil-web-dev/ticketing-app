import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest,
} from "@nk-ticketing-app/common";
import { Ticket } from "../models/ticketing";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.user!.id) throw new NotAuthorizedError();

    const { title, price } = req.body;

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    return res.send(ticket);
  }
);

export { router as updateTicketRouter };
