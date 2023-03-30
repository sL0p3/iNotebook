import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

// Get all Note 
const getNotes = async ()=>{
  // API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0Y2RhODM4ZWE0NjdjOTgyODQ1YjFkIn0sImlhdCI6MTY2Njc1NDcyNX0.64avhvrlC_EIkYmt3modOHB-gFQjMRQdvJYMqe8dUAg"
    },
  });
  const json  = await response.json()
  console.log(json);
  setNotes(json)
}


    // Add a Note 
    const addNote = async (title, description, tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0Y2RhODM4ZWE0NjdjOTgyODQ1YjFkIn0sImlhdCI6MTY2Njc1NDcyNX0.64avhvrlC_EIkYmt3modOHB-gFQjMRQdvJYMqe8dUAg"
        },
        body: JSON.stringify(title, description , tag),
      });


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
    const deleteNote = async (id)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0Y2RhODM4ZWE0NjdjOTgyODQ1YjFkIn0sImlhdCI6MTY2Njc1NDcyNX0.64avhvrlC_EIkYmt3modOHB-gFQjMRQdvJYMqe8dUAg"
        },
      });
      const json =  response.json(); 
      console.log(json);
      console.log("Deleting a note with id " + id)
      const newNotes = notes.filter((note) =>{ return note._id !== id})
      setNotes(newNotes)
    }

    // Edit a Note 
    const editNote = async (id , title, description, tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0Y2RhODM4ZWE0NjdjOTgyODQ1YjFkIn0sImlhdCI6MTY2Njc1NDcyNX0.64avhvrlC_EIkYmt3modOHB-gFQjMRQdvJYMqe8dUAg"
        },
        body: JSON.stringify(title, description , tag),
      });
      const json =  response.json(); 
      //Logic to edit in client 
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag ;
        }
      }
    }

    return (
        <noteContext.Provider value = {{notes, addNote , deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;