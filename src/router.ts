import { Router } from "express";
import bookRouter from "./routes/book";

const router = Router();

router.use("/books", bookRouter);

export default router;