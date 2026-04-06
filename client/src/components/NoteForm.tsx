import React, {useState} from "react";



interface Props{
    onSuccess: () => void;
}

export const NoteForm = ({onSuccess}: Props) =>{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const [tag, setTag] = useState("All Tags");

    const handleSubmit = async(e: React.SubmitEvent) =>{
        e.preventDefault();
        if(!title||!body) return alert("Title and Body are required!");

        try{
            const {noteService} = await import('../services/api');
            await noteService.createNote({title, body, tag, status: 'active'});

            setTitle('');
            setBody('');
            onSuccess();
        }
        catch(error){
            console.error("Save Failed!", error);
        }
    };

    return(
        <form className="note-form" onSubmit={handleSubmit}>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <select value={tag} onChange={(e) =>setTag(e.target.value)}>
                <option value="Office Work">Office Work</option>
                <option value="Home Work">Home Work</option>
                <option value="Perosonal">Perosnal</option>
            </select>
            <textarea placeholder="Take a note..." value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button type="submit">Add Note</button>
            
        </form>
    );
};