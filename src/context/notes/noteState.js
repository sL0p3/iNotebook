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
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;