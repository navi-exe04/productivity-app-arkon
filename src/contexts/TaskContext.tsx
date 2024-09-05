// Import modules
import React, { createContext, useReducer, useContext } from 'react';
import { Task } from '../models/interfaces';

// Define a state for tasks
type TaskState = Task[];

// Define the type of actions for state
type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'COMPLETE_TASK'; payload: string };

// Config the actions
const taskReducer = (state: TaskState, action: Action): TaskState => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'DELETE_TASK':
            return state.filter(task => task.taskId !== action.payload);
        case 'COMPLETE_TASK':
            return state.map(task =>
                task.taskId === action.payload ? { ...task, completed: true } : task
            );
        default:
            return state;
    }
};

// Config the task context
const TaskContext = createContext<{
    state: TaskState;
    dispatch: React.Dispatch<Action>;
}>({ state: [], dispatch: () => null });

// Create the task provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, []);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
