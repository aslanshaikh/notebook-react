import React, {useState} from 'react'
import NoteContext from './noteContext'
import { json } from 'react-router-dom';
// token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMmVlNzU1OGMxNzdiZjQ2ODcwOTI4In0sImlhdCI6MTY5MjY3NjUwN30.g1OpVeYKge-19NUj5tjKWr4QqJQbpFvPHa0BU9PEIQ8"
const NoteState = (props) => {
  const host = "http://localhost:3000";
   const notesInitial = []
   const [notes, setNotes] = useState(notesInitial);

//get all notes 
   const getNotes = async () => {
    //api call karna bacha hai 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json)
   }

   //add a note
   const addNote = async (title, description, tag) => {
    //api call karna bacha hai 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
     const note = await response.json();
    
      setNotes(notes.concat(note));
      
   }
   
   //delete note 
    const deleteNote = async (id) => {
      //api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
       
      });
      const json = response.json();
      console.log(json);
    console.log("deleting " + id);
    const newNotes = notes.filter((note) => {return note._id !== id});
    setNotes(newNotes);
   }

   //update note 
   const editNote = async (id, title, description, tag) => {
    //api call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
   }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;