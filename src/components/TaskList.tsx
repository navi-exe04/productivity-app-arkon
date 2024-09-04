import { useMemo } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';

const TaskList = () => {
    const { state, dispatch } = useTaskContext();

    const pendingTasks = useMemo(
        () => state.filter(task => !task.isCompleted),
        [state]
    );

    return (
        <Box sx={{minWidth: "400px"}}>
            <Typography variant="h4" textAlign="center" marginBottom="32px">
                Lista de tareas
            </Typography>
            <Stack spacing={2}>
                {
                    pendingTasks.map(task => (
                        <Paper elevation={3} key={task.taskId} sx={{border: "2px solid black", borderRadius: "8px", padding: "6px 12px"}}>
                            <Typography variant='subtitle1' textAlign="center" marginBottom="16px">
                                {task.taskTitle} - {task.taskDuration} minutos
                            </Typography>
                            <Typography variant='body1'>
                                {task.taskDescription}
                            </Typography>
                            <Button className='base-Button-root' onClick={() => dispatch({ type: 'COMPLETE_TASK', payload: task.taskId })} >
                                Completar
                            </Button>
                            <Button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.taskId })}>
                                Eliminar
                            </Button>
                        </Paper>
                    ))
                }
            </Stack>
        </Box>
    );
}

export default TaskList;
