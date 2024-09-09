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
    //                                                      // Define the state to edit a task
    const funEditTask = (taskId : string) => {
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
                                className={'list-items__item' + ` ${selectedTab}`}
                            >
                                {/* Task title */}
                                <div className='item-top'>
                                    <Typography className='item-top__title'>
                                        {task.taskTitle}
                                    </Typography>
                                    <Typography className='item-top__duration'>
                                        {task.taskFinalDuration} min.
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
                                        sx={{background:"#2a9d8f"}} 
                                        onClick={() => dispatch({ type: 'COMPLETE_TASK', payload: task.taskId })} 
                                    >
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>
                                    </Button>
                                    <Button 
                                        title='Editar tarea'
                                        sx={{background:"#3a86ff"}} 
                                        onClick={() => funEditTask(task.taskId)}
                                    >
                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_01"> <path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                                    </Button>
                                    <Button 
                                        title='Eliminar tarea'
                                        sx={{background:"#c1121f"}} 
                                        onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.taskId })}
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
                                        {task.taskFinalDuration} min.
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
