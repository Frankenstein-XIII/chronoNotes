import { Router } from "express";
import { createNote, getNotes } from "../controllers/note.controller";

const router = Router();


router.post('/', createNote);
router.get('/', getNotes);


export default router;