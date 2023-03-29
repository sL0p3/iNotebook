import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = [
      {
        "_id": "635a80e60df726b14cc97e0d",
        "user": "634cda838ea467c982845b1d",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "Easy",
        "date": "2022-10-27T13:00:22.398Z",
        "__v": 0
      },
      {
        "_id": "635a80ff0df726b14cc97e0f",
        "user": "634cda838ea467c982845b1d",
        "title": "NOte2",
        "description": "Sleep early",
        "tag": "Difficult",
        "date": "2022-10-27T13:00:47.565Z",
        "__v": 0
      }
    ]
    const [notes, setNotes] = useState(notesInitial)

    // Add a Note 
    const addNote = (title, description, tag)=>{
      // TODO : API Call
      console.log("Adding a new Note")
      const note = {
        "_id": "635a80ff0df726b14cc97e0f",
        "user": "634cda838ea467c982845b1d",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-10-27T13:00:47.565Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }

    // Delete a Note 
    const deleteNote = (id)=>{
      // TODO : API Call
      console.log("Deleting a note with id " + id)
      const newNotes = notes.filter((note) =>{ return note._id !== id})
      setNotes(newNotes)
    }

    // Edit a Note 
    const editNote = ()=>{
      
    }

    return (
        <NoteContext.Provider value = {{notes, setNotes, addNote , deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;