import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.tsx';
import React from 'react';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TaskProps {
  task: Task;
}

export default function TaskList(): JSX.Element {
  const tasks = useTasks();

  return (
    <ul>
      {tasks.tasks.filter((t) => t.done === false).map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }: TaskProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

  let taskContent: JSX.Element;
  if (isEditing) {
    taskContent = (
      <div className="px-2">
        <input
          className="rounded-md text-gray-500"
          value={task.text}
          onChange={(e) => {
            dispatch.dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button
          className="bg-red-200 rounded-lg px-2 ml-2"
          onClick={() => setIsEditing(false)}
        >
          Save
        </button>
      </div>
    );
  } else {
    taskContent = (
      <div className="px-2">
        {task.text}
        <button
          className="bg-red-200 rounded-lg px-2 ml-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <label className="flex space-x-2 py-4 px-2">
      <input
        className="rounded-md text-gray-500"
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch.dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <button
        className="bg-red-200 rounded-lg px-2"
        onClick={() => {
          dispatch.dispatch({
            type: 'deleted',
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}
