export const initialState = {
  todo: { id: 'todo', title: 'To Do', tasks: [] },
  inprog: { id: 'inprog', title: 'In Progress', tasks: [] },
  done: { id: 'done', title: 'Done', tasks: [] },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = {
        id: crypto.randomUUID(),
        title: action.payload,
        createdAt: new Date().toLocaleTimeString(),
        isEditing: false,
      };
      return {
        ...state,
        todo: {
          ...state.todo,
          tasks: [newTask, ...state.todo.tasks],
        },
      };
    }
    case 'UPDATE_TASK': {
      const { columnId, taskId, newTitle } = action.payload;
      const updatedTasks = state[columnId].tasks.map((t) =>
        t.id === taskId ? { ...t, title: newTitle, isEditing: false } : t
      );
      return {
        ...state,
        [columnId]: { ...state[columnId], tasks: updatedTasks },
      };
    }
    case 'DELETE_TASK': {
      const { columnId, taskId } = action.payload;
      const filtered = state[columnId].tasks.filter((t) => t.id !== taskId);
      return {
        ...state,
        [columnId]: { ...state[columnId], tasks: filtered },
      };
    }
    case 'TOGGLE_EDIT': {
      const { columnId, taskId, isEditing } = action.payload;
      const updatedTasks = state[columnId].tasks.map((t) =>
        t.id === taskId ? { ...t, isEditing } : t
      );
      return {
        ...state,
        [columnId]: { ...state[columnId], tasks: updatedTasks },
      };
    }
    case 'MOVE_TASK': {
      const {
        sourceCol,
        destCol,
        sourceIndex,
        destIndex,
      } = action.payload;

      const task = state[sourceCol].tasks[sourceIndex];
      const sourceTasks = Array.from(state[sourceCol].tasks);
      sourceTasks.splice(sourceIndex, 1);
      const destTasks = Array.from(state[destCol].tasks);
      destTasks.splice(destIndex, 0, task);

      return {
        ...state,
        [sourceCol]: {
          ...state[sourceCol],
          tasks: sourceTasks,
        },
        [destCol]: {
          ...state[destCol],
          tasks: destTasks,
        },
      };
    }
    default:
      return state;
  }
};
