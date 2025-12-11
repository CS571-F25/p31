import TodoItem from "./TodoItem";

export default function TodoList({ tasks, setSelectedTask, setEditTask, setIsTaskModalOpen }) {
    return (
        <div className="list-container">
            <ul>
                {tasks.map(task => (
                    <TodoItem 
                        key={task.id} 
                        task={task} 
                        setSelectedTask={setSelectedTask} 
                        setEditTask={setEditTask} 
                        setIsTaskModalOpen={setIsTaskModalOpen} 
                    />
                ))}
            </ul>
        </div>
    );
}
