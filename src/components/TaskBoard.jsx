import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { useState } from 'react';

export default function TaskBoard({ columns, dispatch }) {
  const [input, setInput] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    dispatch({
      type: 'MOVE_TASK',
      payload: {
        sourceCol: source.droppableId,
        destCol: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
      },
    });
  };

  return (
    <div>
      <div className="flex mb-4 max-w-xl mx-auto">
        <input
          className="border flex-grow px-3 py-2 rounded-l"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              dispatch({ type: 'ADD_TASK', payload: input.trim() });
              setInput('');
            }
          }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
          onClick={() => {
            if (input.trim()) {
              dispatch({ type: 'ADD_TASK', payload: input.trim() });
              setInput('');
            }
          }}
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([colId, column]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white p-4 rounded shadow min-h-[100px] transition-colors duration-300 ${
                    snapshot.isDraggingOver ? 'bg-blue-100' : ''
                  }`}
                >
                  <h2 className="font-semibold text-lg mb-3">{column.title}</h2>
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <TaskCard task={task} columnId={colId} dispatch={dispatch} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
