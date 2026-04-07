import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {INote} from './types/note';
import { NoteCard } from "./components/NoteCard";
import { NoteForm } from "./components/NoteForm";




function App(){
    const [notes, setNotes] = useState<INote[]>([]);
    const [search, setSearch] = useState('');
    const [selectTag, setSelectTag] = useState('');

    //the fetch logic: now handles search and tag 
    const fetchNotes =useCallback( async () =>{
        try{
            const response = await axios.get('/api/notes', {
                params: {search, tag: selectTag}
            });
            setNotes(response.data);
        }
        catch(error){
            console.error("Error fetching notes", error);
        }
    },[search, selectTag]);

    useEffect(() =>{
        const delayDebounceFn = setTimeout(()=>{
            fetchNotes();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchNotes]);

    const handleTogglePin = async(note:INote) =>{
        try{
            //1. send the flip to the backend 
            await axios.patch(`/api/notes/${note._id}`,{
                isPinned: !note.isPinned,
            });

            // 2. optimistic UI updates: Refresh the list to see the new sort order
            fetchNotes();
        }catch(error){
            console.error("Error toglling pin:", error);
        }
    };

    const handleDelete = async(id: string) =>{
        if(globalThis.confirm("Are you sure, you want to delete this note?")){
            setNotes((prevNotes) => prevNotes.filter(note=> note._id!==id));
            try{
                await axios.delete(`/api/notes/${id}`);
                fetchNotes();
            }
            catch(error){
                console.error("Delete failed: ",error);
            }
        }
    }

    

    return (
        <div className="app-wrapper">
            <header>
                <h1>The Chrono Notes</h1>
                <NoteForm onSuccess={fetchNotes}/>
                <div className="filter-bar">
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <select value={selectTag} onChange={(e) =>setSelectTag(e.target.value)}>
                        <option value=""> All Tags</option>
                        <option value="Office Work"> Office Work</option>
                        <option value="Home Work">Home Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
            </header>
            <main className="notes-grid">
                {notes.length>0 ? (notes.map((note)=>(
                    <NoteCard key={note._id} note={note} onTogglePin={handleTogglePin} onDelete={handleDelete} />
                ))): (
                    <p className="'empty"> No notes found!</p>
                )}
            </main>
        </div>
    );
}

export default App