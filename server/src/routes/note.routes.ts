import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller";

const router = Router();


router.post('/', createNote);
router.get('/', getNotes);
router.delete('/:id', deleteNote);
router.patch('/:id', updateNote);


export default router;