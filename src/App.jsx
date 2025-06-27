import { useReducer } from 'react';
import { initialState, reducer } from './reducer';
import TaskBoard from './components/TaskBoard';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Kanban Board</h1>
      <TaskBoard columns={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
