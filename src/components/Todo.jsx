import { useEffect, useReducer, useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";


const initialData = [
    {
        value: "Fare la spesa",
        completed : false
    },
    {
        value: "Andare a lavoro",
        completed : true
    },
    {
        value: "Andare al parco",
        completed : true
    },
    {
        value: "Lorem ipsum",
        completed : false
    },
    {
        value: "Andare in palestra",
        completed : true
    },
    
]


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

    const [todos, dispatch] = useReducer(reducer, initialData)

    const [filteredTodos, setFilteredTodos] = useState(todos);

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

    useEffect(() => {
        
        const filterMap = {
            "all": todos,
            "filter_completed": todos.filter(todo => todo.completed),
            "filter_todo": todos.filter(todo => !todo.completed),
        };
    
        setFilteredTodos(filterMap[filter]);

    }, [filter])



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