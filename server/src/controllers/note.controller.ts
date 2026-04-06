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
        const {search, tag} = req.query;
        let query: any = {};

        if (search){
            query.$or =[
                {title: {$regex: search, $options: 'i'}},
                {body:{$regex: search, $options:'i'}}
            ];
        }
        if (tag && typeof tag==='string'){
            query.tag = {$regex: `^${tag}$`, $options:'i'};
        }

        const notes = await Note.find(query).sort({isPinned:-1, createdAt: -1});
        return  res.status(200).json(notes);
        
    }catch(error){
        return res.status(500).json({message: "Error fetching notes", error});
    }
};

export const deleteNote = async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const deleteNote = await Note.findByIdAndDelete(id);

        if (!deleteNote){
            return res.status(404).json({message: "Note not found"});
        }
    }catch(error){
        res.status(500).json({message:"Error deleting note. ", error});
    }
};


export const updateNote = async(req:Request, res: Response) =>{
    try{
        const {id} = req.params;

        const {tag, status} = req.body;
        let updateData = {...req.body};

        if(tag|| status){
            const dateStr = new Date().toISOString().split("T")[0];
            updateData.summary = `${dateStr} - [${tag|| 'N/A'}] - [${status||'N/A'}]`;
        }

        const updateNote = await Note.findByIdAndUpdate(id, updateData, {returnDocument:'after'});

        res.status(200).json(updateNote);
    }
    catch(error){
        res.status(400).json({message: "Error updating note", error});
    }
};