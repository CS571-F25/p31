import { Button } from "react-bootstrap";

function TodoItem({ text, remove }) {
    return (
        <li>
            {text}
            <Button size="sm" variant="danger" onClick={remove}>X</Button>
        </li>
    );
}

export default TodoItem