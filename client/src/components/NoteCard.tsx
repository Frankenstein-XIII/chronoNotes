import {INote} from '../types/note';
import {Pin, Trash2} from 'lucide-react';

interface Props{
    note: INote;
    onTogglePin: (note: INote) => void;
    onDelete: (id: string) =>void;
}

export const NoteCard = ({note, onTogglePin, onDelete}: Props) =>(
    <div className={`note-card ${note.isPinned? 'is-pinned': ''}`}>
        <div className='card-header'>
                <button onClick={() => onTogglePin(note)}>
                    <Pin size={15} fill={note.isPinned? 'gold':'none'} color={note.isPinned? 'gold':'gray'}/>
                </button>
                <h3>{note.title}</h3>
                <button onClick={() => onDelete(note._id)} className='delete-bin'>
                        <Trash2 size={15}/>
                </button>
        </div>
        <p>{note.body}</p>
        <div className='card-footer'>
            <span>{note.tag}</span>
            <small>{note.summary}</small>
        </div>
    </div>
);