import React, {useContext, useState} from 'react'
import notecontext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(notecontext);
    const{addNote }= context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleAddnote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Added successfully", "success");
    }
    const onChange = (e) => {
        
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>Add a Note </h2>
            <form className='my-3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name = "title"aria-describedby="emailHelp"  value={note.title} placeholder="Enter title" onChange={onChange} minLength={5} required/>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name = "description"placeholder="Description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" name = "tag" placeholder="tag" onChange={onChange} minLength={5} required/>
                </div>
                <button disabled = {note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddnote}>Add Note</button>
            </form>
        </div>

    )
}

export default AddNote
