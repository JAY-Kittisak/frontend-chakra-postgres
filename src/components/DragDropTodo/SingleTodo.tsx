import React, { useRef, useState, useEffect } from 'react'
import { Icon } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons'
import { Draggable } from "react-beautiful-dnd";
import { Todo } from '../../utils/helpers'

interface Props {
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                >
                    {edit ? (
                        <input
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="todos__single--text"
                            ref={inputRef}
                        />
                    ) : todo.isDone ? (
                        <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                        <span className="todos__single--text">{todo.todo}</span>
                    )}
                    <div>
                        <span
                            className="icon"
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }}
                        >
                            <Icon as={EditIcon} />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <Icon as={DeleteIcon} />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <Icon as={CheckIcon} />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
}

export default SingleTodo