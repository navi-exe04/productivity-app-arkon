// Import modules
import { useMemo } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';

const TaskList = () => {
    // Config state for tasks
    const { state, dispatch } = useTaskContext();

    // Obtain the pending tasks
    const pendingTasks = useMemo(
        () => state.filter(task => !task.isCompleted),
        [state]
    );

    // List of pending tasks
    return (
        <Box sx={{minWidth: "400px"}}>
            <Typography variant="h4" textAlign="center" marginBottom="32px">
                Lista de tareas
            </Typography>
            <Stack spacing={2}>
                {
                    pendingTasks.map(task => (
                        <Paper elevation={3} key={task.taskId} sx={{border: "2px solid black", borderRadius: "8px", padding: "6px 12px"}}>
                            <Typography variant='h6' textAlign="center" marginBottom="16px">
                                {task.taskTitle} - {task.taskDuration} minutos
                            </Typography>
                            <Typography variant='body1' textAlign="center">
                                {task.taskDescription}
                            </Typography>
                            <Button sx={{background:"#2a9d8f", marginRight: "12px"}} onClick={() => dispatch({ type: 'COMPLETE_TASK', payload: task.taskId })} >
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                            </Button>
                            <Button sx={{background:"#c1121f"}} onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.taskId })}>
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </Button>
                        </Paper>
                    ))
                }
            </Stack>
        </Box>
    );
}

export default TaskList;
