import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(notecontext);
  const { notes, getNotes, editNote } = context;
  const ref = useRef(null)
  const refclose = useRef(null)
  let navigate = useNavigate();
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else {
      navigate("/login");
    }
    
    
  }, [])
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
  
  }

    const handleClick = (e) => {
        console.log("updating note", note );
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showAlert("Updated Successfully", "success");
    }
    const onChange = (e) => {    
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>

      <AddNote showAlert = {props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form className='my-3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="etitle" name = "etitle" aria-describedby="emailHelp" value={note.etitle} placeholder="Enter title" onChange={onChange} minLength={5} required/>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="edescription" name = "edescription" value={note.edescription}  onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="etag" name = "etag" value={note.etag}  onChange={onChange} minLength={5} required/>
                </div>
               
            </form>
            </div>
            <div className="modal-footer">
              <button ref = {refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
          
        </div>
      </div>
      <h2>Your Notes : </h2>
      <div className="row my-3">
      {notes.length === 0 && 'No notes to display'}
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert = {props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
