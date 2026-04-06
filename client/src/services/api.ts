import axios from 'axios';
import {INote} from '../types/note';

const API  = axios.create({baseURL: '/api/notes'});

export const noteService = {
    getNotes : (params: object) => API.get<INote>('/',{params}),
    createNote: (data: Partial<INote>) => API.post('/', data),
    updateNote: (id: string, data:Partial<INote>) => API.patch(`/${id}`, data),
    deleteNote: (id: string) =>API.delete(`/${id}`)
};