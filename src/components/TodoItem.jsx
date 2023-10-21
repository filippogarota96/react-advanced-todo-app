
import { useEffect, useState } from "react"
import { EditIcon } from "./icons/EditIcon"
import { TrashIcon } from "./icons/TrashIcon"


export function TodoItem({ item, index, editTodo }) {

    const [completed, setCompleted] = useState(item.completed);
    const [editing, setEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(item.value);

    const handleChangeCompleted = () => {
        setCompleted(prev => !prev);
        editTodo({
            value: editingValue,
            completed: !completed
        }, index,)
    }


    const onSetEditing = () => {
        setEditing(true);
    }

    const handleChangeValue = (e) => {
        setEditingValue(e.target.value)
    }

    const handleSaveOnEdit = () => {
        setEditing(!editing)

        editTodo({
            value: editingValue,
            completed: completed
        }, index)

    }

    useEffect(() => {
        setCompleted(item.completed);
    }, [item.completed]);

    return (
        <>
            <div className="border py-3 px-5 w-[90%] m-auto flex justify-between my-3 rounded">
                <div className="w-[70%]">
                    {editing ? (
                        <input type="text"
                            className="border rounded px-2 w-full"
                            value={editingValue}
                            onChange={handleChangeValue}
                            onBlur={handleSaveOnEdit}
                        />
                    ) : (
                        <div className={completed ?  "text-red-400 line-through" : ""}>
                            {item.value}
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <input type="checkbox" checked={completed} onChange={handleChangeCompleted} />
                    <button className="mx-4" onClick={onSetEditing}> <EditIcon /> </button>
                    <button> <TrashIcon /></button>
                </div>

            </div>
        </>
    )
}