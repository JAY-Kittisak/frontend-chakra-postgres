import React, { useState } from 'react'
import { Flex, Text, Divider } from '@chakra-ui/react'
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import InputTodo from "../components/DragDropTodo/InputTodo";
import TodoList from "../components/DragDropTodo/TodoList";
import { Todo } from "../utils/helpers";

interface Props { }

const TodoPage: React.FC<Props> = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        console.log(result);
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        let add;
        let active = todos;
        let complete = CompletedTodos;
        // Source Logic
        if (source.droppableId === "TodosList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }
        // Destination Logic
        if (destination.droppableId === "TodosList") {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }
        setCompletedTodos(complete);
        setTodos(active);
    };

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            <Flex w="100%" flexDir="column" mr="2">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="gray.600"
                >
                    Todo
                </Text>
                <Divider mt={1} mb={5} orientation="horizontal" />

                <DragDropContext onDragEnd={onDragEnd}>
                    <Flex
                        flexDir="column"
                        w={["100%", "100%", "100%", "70%", "50%"]}
                        h="666px"
                        p={6}
                        ml={5}
                        rounded="7px"
                        boxShadow="md"
                    >
                        <InputTodo todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                        <TodoList
                            todos={todos}
                            setTodos={setTodos}
                            CompletedTodos={CompletedTodos}
                            setCompletedTodos={setCompletedTodos}
                        />
                    </Flex>
                </DragDropContext>
            </Flex>
        </Flex>
    )
}

export default TodoPage