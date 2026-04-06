import { Request, Response } from "express";
import {Note} from '../models/Note'

export const createNote = async(req: Request, res: Response) =>{
    try{
        const {title, tag, body, status} = req.body;
        const dateStr = new Date().toISOString().split("T")[0];
        const summary = `${dateStr} -[${tag}] - [${status}]`;

        const newNote = await Note.create({...req.body, summary});
        res.status(201).json(newNote);

    }catch(error){
        res.status(400).json({message:"Failed to create note. ", error});
    }
};

export const getNotes = async(req:Request, res: Response) =>{
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({message: "Error fetching notes", error});
    }
}
