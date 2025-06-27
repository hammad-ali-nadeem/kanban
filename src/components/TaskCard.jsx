import { useState, useRef, useEffect } from 'react';

export default function TaskCard({ task, columnId, dispatch }) {
  const [tempTitle, setTempTitle] = useState(task.title);
  const inputRef = useRef();

  useEffect(() => {
    if (task.isEditing) inputRef.current?.focus();
  }, [task.isEditing]);
const bgColor =
    columnId === 'inprog'
      ? 'bg-yellow-100'
      : columnId === 'done'
      ? 'bg-green-100'
      : 'bg-gray-50';
  const saveEdit = () => {
    if (tempTitle.trim()) {
      dispatch({ type: 'UPDATE_TASK', payload: { columnId, taskId: task.id, newTitle: tempTitle.trim() } });
    } else {
      dispatch({ type: 'TOGGLE_EDIT', payload: { columnId, taskId: task.id, isEditing: false } });
    }
  };

  return (
    <div className={`${bgColor} p-3 rounded border relative shadow hover:shadow-md transition`}>
      {task.isEditing ? (
        <input
          ref={inputRef}
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') dispatch({ type: 'TOGGLE_EDIT', payload: { columnId, taskId: task.id, isEditing: false } });
          }}
          className="w-full border px-2 py-1 rounded"
        />
      ) : (
        <div onDoubleClick={() =>
          dispatch({ type: 'TOGGLE_EDIT', payload: { columnId, taskId: task.id, isEditing: true } })
        }>
          <p className="text-sm">{task.title}</p>
          <span className="text-xs text-gray-400">{task.createdAt}</span>
        </div>
      )}
      <button
        onClick={() =>
          dispatch({ type: 'DELETE_TASK', payload: { columnId, taskId: task.id } })
        }
        className="absolute top-1 right-2 text-gray-400 hover:text-red-500"
        aria-label="Delete"
      >
        ×
      </button>
    </div>
  );
}
