import React, { useRef } from 'react'
import '../../styles/itComment.scss'
interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputComment: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form
            className="input"
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}
        >
            <input
                type="text"
                placeholder="Enter a Task"
                value={todo}
                ref={inputRef}
                onChange={(e) => setTodo(e.target.value)}
                className="input__box"
            />
            <button type="submit" className="input_submit">
                GO
            </button>
        </form>
    );
}

export default InputComment