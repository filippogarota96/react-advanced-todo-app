import { useEffect, useReducer, useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";


function reducer(state, action) {
    switch (action.type) {
        case "add_new_item":
            return [...state, action.payload.new_item]
        case "edit_item":
            state[action.payload.item_index] = action.payload.item;
            return [...state]
        default:
            return state
    }

}

export function Todo() {

    const [todos, dispatch] = useReducer(reducer, [])

    const [filter, setFilter] = useState("all");

    const onNewTodo = (newTodo) => {
        dispatch({ type: "add_new_item", payload: { new_item: newTodo } })
    }


    const editTodoItem = (item, itemIndex) => {
        dispatch({
            type: "edit_item",
            payload: { item_index: itemIndex, item: item, }
        })
    }

    const computeFilteredTodos = () => {
        if (filter === "all") {
            return todos;
        } else if (filter === "filter_completed") {
            return todos.filter(item => item.completed);
        } else if (filter === "filter_todo") {
            return todos.filter(item => !item.completed);
        }
        return todos;
    }

    const filteredTodos = computeFilteredTodos();

    return (
        <>
            <div className="absolute-center container">
                <div className="text-center m-auto p-5">
                    <h1 className="text-xl">Todo List</h1>
                    <TodoInput addTodo={onNewTodo} />
                </div>
                <div className="text-center w-[90%] p-5 m-auto grid grid-cols-12">
                    <button className="button-blue col-span-4" onClick={() => setFilter(prev => prev = "all")}>Tutti</button>
                    <button className="button-blue col-span-4 mx-3" onClick={() => setFilter(prev => prev = "filter_completed")}>Completati</button>
                    <button className="button-blue col-span-4" onClick={() => setFilter(prev => prev = "filter_todo")}>Da Completare</button>
                </div>
                <div className="my-5">
                    {/* Lista di todo */}
                    <h2 className="text-center">List</h2>
                    {filteredTodos.map((item, index) => {
                        return (
                            <TodoItem
                                item={item}
                                key={index}
                                index={index}
                                editTodo={editTodoItem}
                            />
                        )
                    })}

                </div>
            </div>
        </>
    )
}