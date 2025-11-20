import { useState } from "react";
import TodoItem from "./TodoItem";
import { Button, Form } from "react-bootstrap";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    function addTask() {
        if (input.trim() == "") return;
        setTasks([...setTasks, input]);
        setInput("");
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    return (
        <div>
            <Form.Group>
                <Form.Control
                    type="text"
                    value={input}
                    placeholder="Add a task..."
                    onChange={(e) => setInput(e.target.value)} 
                />
            </Form.Group>

            <Button className="mt-2" onClick={addTask}>Add</Button>

            <ul>
                {tasks.map((task, i) => (
                    <TodoItem key={i} text={task} remove={() => deleteTask(i)} />
                ))}
            </ul>
        </div>
    )
}

export default TodoList