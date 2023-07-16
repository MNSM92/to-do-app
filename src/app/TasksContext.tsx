import React, { createContext, useContext, useReducer } from 'react';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

type TaskAction =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number };

interface TasksContextType {
  tasks: Task[];
}

interface TasksDispatchContextType {
  dispatch: React.Dispatch<TaskAction>;
}

const TasksContext = createContext<TasksContextType | null>(null);

const TasksDispatchContext = createContext<TasksDispatchContextType | null>(null);

function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added': {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks: Task[] = [
  { id: 0, text: "It's the first task", done: true },
  { id: 1, text: "It's the second task", done: false },
  { id: 2, text: "It's the third one", done: false },
];

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={{ tasks }}>
      <TasksDispatchContext.Provider value={{ dispatch }}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextType {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

export function useTasksDispatch(): TasksDispatchContextType {
  const context = useContext(TasksDispatchContext);
  if (!context) {
    throw new Error('useTasksDispatch must be used within a TasksProvider');
  }
  return context;
}
