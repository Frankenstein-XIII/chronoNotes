// Phase1:   The Blueprint (Schema and Type system)
// What?: defining the ts interface, and the mongoose schema. this creates the 
// contract between database and the code, ensuring every Note object has
// exact same structure accross the entire stack 

// Why?: Prevents errors like trying to read note.tags when the field is actually called note.tag
// automation: mongoose's timestamps option automatically handles createAt and updatedAt.
// consistency 

import {Schema, model, Document} from 'mongoose';


//1. Define the typescript interface
export interface INote extends Document{
    title: string;
    tag: string;
    body: string;
    status: 'active' | 'in-progress'|'completed';
    summary: string;
    ceatedAt: Date;
    updatedAt: Date;
}


const noteSchema = new Schema<INote>({
    title:{type: String, required: true},
    tag: {type: String, required: true},
    body: {type:String, required: true},
    status:{ type: String,  enum: ['active', 'in-progress', 'completed'], default: 'active' },
    summary: {type: String, required: true},
},{
    timestamps: true
}
)