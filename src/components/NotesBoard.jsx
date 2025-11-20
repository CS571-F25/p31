import { useState } from "react";
import StickyNote from "./StickyNote";
import { Button, Form } from "react-bootstrap";

function NotesBoard() {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState("");

    function addNote() {
        if (input.trim() === "") return;
        setNotes([...notes, input]);
        setInput("");
    }

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="Write a note..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button className="mt-2" onClick={addNote}>Add Sticky Note</Button>

            <div>
                {notes.map((note, i) => {
                    <StickyNote key={i} text={note} />
                })}
            </div>
        </div>
    )
}

export default NotesBoard