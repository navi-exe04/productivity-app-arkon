//=====================================================================================================================
//==========================================================// Task list component
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { useMemo, useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import { Task } from '../models/interfaces';


//=====================================================================================================================
//==========================================================// Component
const TaskList = () => {
    //=================================================================================================================
    //======================================================// Component state
    const { state, dispatch } = useTaskContext();
    const [selectedTab, setSelectedTab] = useState('pending');

    //=================================================================================================================
    //======================================================// Effects and functions

    //-----------------------------------------------------------------------------------------------------------------
    //                                                      // Obtain the pending tasks
    const pendingTasks = useMemo(() => 
        state.tasks.filter(task => !task.isCompleted),
        [state]
    );

    //-----------------------------------------------------------------------------------------------------------------
    //                                                      // Obtain the completed tasks
    const completedTasks = useMemo(() => 
        state.tasks.filter(task => task.isCompleted),
        [state]
    );

    //-----------------------------------------------------------------------------------------------------------------
    //                                                      // Select a task from list
    const funSelectTask = (taskId: string) => {
        //                                                  // Get the task from list
        const selectedTask = state.tasks.find(task => task.taskId === taskId);
        //                                                  // Remove the task from list
        const updatedTasks = state.tasks.filter(task => task.taskId !== taskId);
        //                                                  // Reorder the tasks list
        const reorderedTasks = [selectedTask, ...updatedTasks];
        //                                                  // Updates the tasks list in state
        dispatch({
            type: 'SET_TASK_LIST',
            payload: reorderedTasks as Task[]
        });
        //                                                  // Set the selected task in state
        dispatch({
            type: 'SET_SELECTED_TASK',
            payload: taskId
        });
    }

    //-----------------------------------------------------------------------------------------------------------------
    //                                                      // Define the state to edit a task
    const funEditTask = (taskId : string) => {
        //                                                  // Obtain the task information to edit
        const taskInfo = state.tasks.find(task => task.taskId === taskId);
        dispatch({
            type: 'SET_TASK_INFO',
            payload: taskInfo as Task
        });
        dispatch({
            type: 'SET_EDITING_TASK',
            payload: true
        });
        dispatch({
            type: 'SET_RESET_FORM',
            payload: true
        })
    }

    //-----------------------------------------------------------------------------------------------------------------
    //                                                      // Delete a task in state
    const funDeleteTask = (taskId : string) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
        //                                                  // Clean the timer if the selected task was deleted
        if (state.selectedTask?.taskId === taskId) {
            dispatch({
                type: 'SET_SELECTED_TASK',
                payload: null,
            })
        }
    }

    //=================================================================================================================
    //======================================================// Component template
    return (
        <Box id='tasks-list'>
            <div className='tasks-list__top'>
                {/* Tasks lists tabs */}
                <Stack direction="row" spacing={2}>
                    <Button 
                        className={'top-tabs__btn' + `${selectedTab == 'pending' ? " active" : ""}`} 
                        variant="contained" 
                        onClick={() => setSelectedTab('pending')}
                    >
                        Tareas pendientes
                    </Button>
                    <Button 
                        className={'top-tabs__btn' + `${selectedTab == 'completed' ? " active" : ""}`} 
                        variant="contained" 
                        onClick={() => setSelectedTab('completed')}
                    >
                        Tareas terminadas
                    </Button>
                </Stack>
            </div>

            {/* List of tasks */}
            <Stack spacing={2} className='tasks-list__items'>
                {
                    selectedTab == 'pending' ? (
                        // List of pending tasks
                        pendingTasks.map(task => (
                            <Paper 
                                elevation={3} 
                                key={task.taskId} 
                                className={
                                    'list-items__item' 
                                    + ` ${selectedTab}` 
                                    + `${state.selectedTask?.taskId === task.taskId ? ' selected' : ''}`
                                }
                            >
                                {/* Task title */}
                                <div className='item-top'>
                                    <Typography className='item-top__title'>
                                        {task.taskTitle}
                                    </Typography>
                                    <Typography className='item-top__duration'>
                                        Duración {Math.floor(task.taskFinalDuration / 3600)}h:
                                        {Math.floor((task.taskFinalDuration % 3600) / 60)}m:
                                        {task.taskFinalDuration % 60}s
                                    </Typography>
                                </div>
                                {/* Task information */}
                                <div className='item-info'>
                                    <Typography className='item-info__description'>
                                        {task.taskDescription}
                                    </Typography>
                                </div>
                                {/* Task options */}
                                <div className="item-options">
                                    <Button
                                        title='Comenzar tarea'
                                        sx={{background:"#3a86ff"}} 
                                        onClick={() => funSelectTask(task.taskId)} 
                                    >
                                        <svg width="25px" height="25px" viewBox="0 -4 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view_simple [#815]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-260.000000, -4563.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M216,4409.00052 C216,4410.14768 215.105,4411.07682 214,4411.07682 C212.895,4411.07682 212,4410.14768 212,4409.00052 C212,4407.85336 212.895,4406.92421 214,4406.92421 C215.105,4406.92421 216,4407.85336 216,4409.00052 M214,4412.9237 C211.011,4412.9237 208.195,4411.44744 206.399,4409.00052 C208.195,4406.55359 211.011,4405.0763 214,4405.0763 C216.989,4405.0763 219.805,4406.55359 221.601,4409.00052 C219.805,4411.44744 216.989,4412.9237 214,4412.9237 M214,4403 C209.724,4403 205.999,4405.41682 204,4409.00052 C205.999,4412.58422 209.724,4415 214,4415 C218.276,4415 222.001,4412.58422 224,4409.00052 C222.001,4405.41682 218.276,4403 214,4403" id="view_simple-[#815]"> </path> </g> </g> </g> </g></svg>
                                    </Button>
                                    <Button 
                                        title='Editar tarea'
                                        sx={{background:"#ffbc42"}} 
                                        onClick={() => funEditTask(task.taskId)}
                                    >
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_01"> <path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                                    </Button>
                                    <Button 
                                        title='Eliminar tarea'
                                        sx={{background:"#c1121f"}} 
                                        onClick={() => funDeleteTask(task.taskId)}
                                    >
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    </Button>
                                </div>
                            </Paper>
                        ))
                    ) 
                    : (
                        // List of completed tasks
                        completedTasks.map(task => (
                            <Paper 
                                elevation={3} 
                                key={task.taskId} 
                                className={'list-items__item' + ` ${selectedTab}`}
                            >
                                {/* Task title */}
                                <div className='item-top'>
                                    <Typography className='item-top__title'>
                                        {task.taskTitle}
                                    </Typography>
                                    <Typography className='item-top__duration'>
                                        {Math.floor(task.taskCompletedDuration / 3600)}h:
                                        {Math.floor((task.taskCompletedDuration % 3600) / 60)}m:
                                        {task.taskCompletedDuration % 60}s
                                    </Typography>
                                </div>
                                {/* Task information */}
                                <div className='item-info'>
                                    <Typography className='item-info__description'>
                                        {task.taskDescription}
                                    </Typography>
                                </div>
                                {/* Task options */}
                                <div className="item-options">
                                    <Button 
                                        title='Marcar tarea como pendiente'
                                        sx={{background:"#eb5e28"}} 
                                        onClick={() => dispatch({ type: 'UNCOMPLETE_TASK', payload: task.taskId })} 
                                    >
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#ffffff"></path> </g></svg>
                                    </Button>
                                    <Button 
                                        title="Eliminar tarea"
                                        sx={{background:"#c1121f"}} 
                                        onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.taskId })}
                                    >
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    </Button>
                                </div>
                            </Paper>
                        ))
                    )
                }
            </Stack>
        </Box>
    );
}

export default TaskList;
