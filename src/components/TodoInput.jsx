import { useState } from "react"

export function TodoInput({ addTodo }) {

    const [todoItem, setTodoItem] = useState("");

    const handleChange = (e) => setTodoItem(e.target.value)

    const onSubmit = () => {

        if (todoItem != "") {
            addTodo({
                value: todoItem,
                completed: false,
            })
        }

        setTodoItem("");
    }

    return (
        <>
            <div className="rounded border border-solid my-5 p-5 w-[90%] m-auto">
                <input
                    className="border p-2 w-full"
                    type="text"
                    placeholder="Aggiungi un task"
                    value={todoItem}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className=" w-full mt-3 button-blue"
                    onClick={onSubmit}
                >Aggiungi</button>
            </div>
        </>
    )
}