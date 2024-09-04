import React, { createContext, useReducer, useContext } from 'react';
import { Task } from '../models/interfaces';

type TaskState = Task[];

type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'COMPLETE_TASK'; payload: string };

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

const TaskContext = createContext<{
    state: TaskState;
    dispatch: React.Dispatch<Action>;
}>({ state: [], dispatch: () => null });

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, []);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
        {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
