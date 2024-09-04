import { useState, useRef } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { 
    FormControl, Button, 
    TextField, Stack, 
    Typography, Paper, 
    Box, Select, MenuItem,
    InputLabel
} from '@mui/material';

const TaskForm = () => {
    const { dispatch } = useTaskContext();
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskDuration, setTaskDuration] = useState<number>(0);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [showDurationInput, setShowDurationInput] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const funAddTask = () => {
        if (taskDescription.trim() && taskDuration > 0) {
            dispatch({
                type: 'ADD_TASK',
                payload: {
                    taskId: Date.now().toString(),
                    taskTitle,
                    taskDescription,
                    taskDuration,
                    isCompleted: false,
                },
            });
            setTaskTitle('');
            setTaskDescription('');
            setTaskDuration(0);
            inputRef.current?.focus();
        }
    };

    const funSetTaskDuration = (duration : number) => {
        if (duration != 1) 
            setTaskDuration(duration);
        else
            setShowDurationInput(true);
    }

    return (
        <Box>
            <Paper elevation={4} sx={{ padding: '2rem', maxWidth: '350px', width: '100%', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" marginBottom="32px">
                    Crear una nueva tarea
                </Typography>
                <FormControl fullWidth>
                    <Stack spacing={2}>
                        <TextField 
                            fullWidth 
                            label="Titulo de la tarea" 
                            variant="outlined"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required 
                        />
                        <TextField 
                            fullWidth 
                            label="Descripción de la tarea" 
                            variant="outlined" 
                            multiline 
                            rows={4}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <div>
                            {
                                !showDurationInput ? (
                                    <>
                                        <InputLabel id="select-duration-label">
                                            Duración (min)
                                        </InputLabel>
                                        <Select
                                            fullWidth
                                            labelId='select-duration-label'
                                            id='select-duration'
                                            label="Duración (min)"
                                            value={taskDuration}
                                            onChange={(e) => funSetTaskDuration(Number(e.target.value))}
                                            required
                                        >
                                            <MenuItem value={30}>Corta (30 minutos)</MenuItem>
                                            <MenuItem value={45}>Media (45 minutos)</MenuItem>
                                            <MenuItem value={60}>Larga (1 hora)</MenuItem>
                                            <MenuItem value={1}>Personalizada</MenuItem>
                                        </Select>
                                    </>
                                )
                                : (
                                    <TextField 
                                        fullWidth
                                        type='number'
                                        label="Duración personalizada en min." 
                                        variant="outlined"
                                        onChange={(e) => setTaskDuration(parseInt(e.target.value))}
                                    />
                                )
                            }
                        </div>
                        <Button onClick={funAddTask} variant="contained" color="primary" fullWidth>
                            Add Task
                        </Button>
                    </Stack>
                </FormControl>
            </Paper>
        </Box>
    );
}

export default TaskForm;
