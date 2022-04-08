import { getPage } from "./controllers";
import express  from "express";

const router = express.Router()

router.get('/', getPage)

export default router