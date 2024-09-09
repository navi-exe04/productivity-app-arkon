// Import modules
import React, { createContext, useReducer, useContext } from 'react';
import { Task } from '../models/interfaces';

// Define a state for tasks
type TaskState = {
    tasks: Task[],
    isEditing: boolean,
    taskInfo: Task,
    resetForm: boolean,
};

// Define the type of actions for state
type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'COMPLETE_TASK'; payload: string }
    | { type: 'UNCOMPLETE_TASK'; payload: string }
    | { type: 'SET_TASK_INFO'; payload: Task }
    | { type: 'SET_EDITING_TASK'; payload: boolean }
    | { type: 'EDIT_TASK'; payload: Task }
    | { type: 'SET_RESET_FORM'; payload: boolean };

// Config the actions
const taskReducer = (state: TaskState, action: Action): TaskState => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskId !== action.payload)
            };
        case 'COMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.taskId === action.payload ? { ...task, isCompleted: true, taskFinalDuration: task.taskDuration } : task
                )
            };
        case 'UNCOMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.taskId === action.payload ? { ...task, isCompleted: false } : task
                )
            };
        case 'SET_TASK_INFO':
            return {
                ...state,
                taskInfo: action.payload
            }
        case 'SET_EDITING_TASK':
            return {
                ...state,
                isEditing: action.payload
            };
        case 'EDIT_TASK': {
            return {
                ...state,
                tasks: state.tasks.map(task => 
                    task.taskId === action.payload.taskId 
                        ? { ...task, ...action.payload } 
                        : task
                ),
                isEditing: false,
                taskInfo: {} as Task
            };
        }
        case 'SET_RESET_FORM':
            return {
                ...state,
                resetForm: action.payload
            };
        default:
            return state;
    }
};

// Config the task context
const TaskContext = createContext<{ state: TaskState; dispatch: React.Dispatch<Action> } | undefined>(undefined);
// const TaskContext = createContext<{
//     state: TaskState;
//     dispatch: React.Dispatch<Action>;
// }>({ 
//     state: {
//         tasks: [], 
//         isEditing: false, 
//         taskInfo: {
//             taskId: "",
//             taskTitle: "",
//             taskDescription: "",
//             taskDuration: 0,
//             taskFinalDuration: 0,
//             isCompleted: false,
//             isCustomDuration: false,
//         }
//     }, 
//     dispatch: () => null 
// });

// Create the task provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
            tasks: [], 
            isEditing: false, 
            taskInfo: {} as Task,
            resetForm: false,
    });

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used a TaskProvider')
    }
    return context;
};
