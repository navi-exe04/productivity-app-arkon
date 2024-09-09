//=====================================================================================================================
//==========================================================// Task context
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import React, { createContext, useReducer, useContext } from 'react';
import { Task } from '../models/interfaces';

//=====================================================================================================================
//==========================================================// Task state model
type TaskState = {
    tasks: Task[],
    isEditing: boolean,
    taskInfo: Task,
    selectedTask: Task | undefined,
    resetForm: boolean,
};

//=====================================================================================================================
//==========================================================// Actions
type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'EDIT_TASK'; payload: Task }
    | { type: 'COMPLETE_TASK'; payload: string }
    | { type: 'UNCOMPLETE_TASK'; payload: string }
    | { type: 'SET_TASK_INFO'; payload: Task }
    | { type: 'SET_SELECTED_TASK'; payload: string | null}
    | { type: 'SET_EDITING_TASK'; payload: boolean }
    | { type: 'SET_RESET_FORM'; payload: boolean };

//=====================================================================================================================
//==========================================================// Reducer
const taskReducer = (state: TaskState, action: Action): TaskState => {
    switch (action.type) {
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Create a task
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Delete a task
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskId !== action.payload)
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Edit a task
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
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Define a task as complete
        case 'COMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.taskId === action.payload ? { ...task, isCompleted: true, taskFinalDuration: task.taskDuration } : task
                )
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Define a task as uncomplete
        case 'UNCOMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.taskId === action.payload ? { ...task, isCompleted: false } : task
                )
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Define a task info
        case 'SET_TASK_INFO':
            return {
                ...state,
                taskInfo: action.payload
            }
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Define a selected task
        case 'SET_SELECTED_TASK':
            return {
                ...state,
                selectedTask: 
                    action.payload == null 
                        ? undefined 
                        : state.tasks.find(task => task.taskId === action.payload),
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Set a editing task status
        case 'SET_EDITING_TASK':
            return {
                ...state,
                isEditing: action.payload
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Reset the form component
        case 'SET_RESET_FORM':
            return {
                ...state,
                resetForm: action.payload
            };
        //-------------------------------------------------------------------------------------------------------------
        //                                                  // Default
        default:
            return state;
    }
};

//=====================================================================================================================
//==========================================================// Task context
const TaskContext = createContext<{
    state: TaskState;
    dispatch: React.Dispatch<Action>;
}>({ 
    state: {
        tasks: [], 
        isEditing: false, 
        taskInfo:{} as Task,
        selectedTask: undefined,
        resetForm: false,
    }, 
    dispatch: () => null 
});

//=====================================================================================================================
//==========================================================// Task provider
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: [], 
        isEditing: false, 
        taskInfo:{} as Task,
        selectedTask: undefined,
        resetForm: false,
    });

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

//=====================================================================================================================
//==========================================================// Custom task context
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used a TaskProvider')
    }
    return context;
};
