import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.tsx';

export default function AddTask(): JSX.Element {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();

  const [nextId, setNextId] = useState<number>(3);


  const handleAddTask = (): void => {
    dispatch.dispatch({
      type: 'added',
      id: nextId+1,
      text: text,
    });

    setText('');
    console.log(nextId+1)
    setNextId(nextId+1) 
  };

  

  return (
    <div>
      <input
        className="rounded-md text-gray-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="px-2 bg-red-200 rounded-md ml-2"
        onClick={handleAddTask}
      >
        Add
      </button>
    </div>
  );
}
