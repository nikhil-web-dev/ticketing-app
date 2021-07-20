import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@nk-ticketing-app/common";
// import { createTicketRouter } from "./routes/new";
// import { showRouter } from "./routes/show";
import { IndexOrderRouter } from "./routes";
// import { updateTicketRouter } from "./routes/update";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(IndexOrderRouter);

// app.use(createTicketRouter);
// app.use(showRouter);

// app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };