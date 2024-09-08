// Import modules
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
    // Configure state for the component
    const { state, dispatch } = useTaskContext();
    
    const [taskTitle, setTaskTitle] = useState<string>(state.taskInfo ? state.taskInfo.taskTitle : "");
    const [taskDescription, setTaskDescription] = useState<string>(state.taskInfo ? state.taskInfo.taskDescription : "");
    const [taskDuration, setTaskDuration] = useState<number>(state.taskInfo ? state.taskInfo.taskDuration : 0);
    
    const [showCustomizedDurationInput, setShowCustomizedDurationInput] = useState<boolean>(false);
    const [customHours, setCustomHours] = useState<number>(0);
    const [customMinutes, setCustomMinutes] = useState<number>(0);
    const [customDuration, setCustomDuration] = useState<number>(0);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset the component state
    const funResetState = () => {
        setTaskTitle('');
        setTaskDescription('');
        setTaskDuration(0);
        setShowCustomizedDurationInput(false);
        setCustomHours(0);
        setCustomMinutes(0);
        setCustomDuration(0);

    }

    // Add a new task in state
    const funAddTask = (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskDescription.trim() && taskDuration > 0) {
            dispatch({
                type: 'ADD_TASK',
                payload: {
                    taskId: Date.now().toString(),
                    taskTitle,
                    taskDescription,
                    taskDuration: showCustomizedDurationInput ? customDuration : taskDuration,
                    isCompleted: false,
                    isCustomDuration: showCustomizedDurationInput,
                },
            });
            funResetState();
            inputRef.current?.focus();
        }
    };

    // Set the duration in state or defines a customized duration
    const funSetTaskDuration = (duration : number) => {
        setTaskDuration(duration);
        
        if (duration == 1) 
            return setShowCustomizedDurationInput(true);

        return setShowCustomizedDurationInput(false);
    }

    // Set the customized duration in state
    const funSetCustomizedDurantion = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // Obtain the values of inputs and define temp variables
        const {id, value} = e.target;
        const duration = parseInt(value);
        let newCustomHours = customHours;
        let newCustomMinutes = customMinutes;
        
        // Check the custom hours or minutes
        if (id === 'hours') {
            setCustomHours(duration);
            newCustomHours = duration;
        }
        else {
            setCustomMinutes(duration);
            newCustomMinutes = duration;
        }

        // Save the custom duration in state
        const totalDuration = (newCustomHours*60) + newCustomMinutes;
        setCustomDuration(totalDuration);
        
        // Verify if the duration is correct
        if (totalDuration > 120)
            return setShowErrorMessage(true);
        else
            return setShowErrorMessage(false);
    }

    return (
        <Box>
            <Paper elevation={4} className='form-container' sx={{ 
                padding: '2rem', maxWidth: '350px', 
                width: '100%', borderRadius: '10px',
                margin: '0 12px'
            }}>
                <form onSubmit={funAddTask}>
                    <Typography variant="h4" className='title'>
                        Crear una nueva tarea
                    </Typography>
                    <Stack spacing={2}>
                        <FormControl>
                            <TextField 
                                fullWidth 
                                label="Titulo de la tarea" 
                                variant="outlined"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                required 
                            />
                        </FormControl>
                        <FormControl>
                            <TextField 
                                fullWidth 
                                label="Descripción de la tarea" 
                                variant="outlined" 
                                multiline 
                                rows={4}
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
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
                                <MenuItem value={0} disabled defaultChecked>Elegir duración</MenuItem>
                                <MenuItem value={30}>Corta (30 minutos)</MenuItem>
                                <MenuItem value={45}>Media (45 minutos)</MenuItem>
                                <MenuItem value={60}>Larga (1 hora)</MenuItem>
                                <MenuItem value={1}>Personalizada</MenuItem>
                            </Select>
                            {
                                showCustomizedDurationInput && (
                                    <>
                                        <Typography margin="12px 0">
                                            Duración personalizada (2 hrs. Máximo)
                                        </Typography>
                                        <TextField 
                                            id='hours'
                                            error={showErrorMessage}
                                            type='number'
                                            label="Horas"
                                            variant="outlined"
                                            helperText={showErrorMessage ? 'La duración no puede ser más de 2 hrs.' : ""}
                                            sx={{marginBottom:"12px"}}
                                            onChange={funSetCustomizedDurantion}
                                            inputProps={{
                                                min: 0, 
                                                max: 2,
                                            }}
                                            required
                                        />
                                        <TextField
                                            id='minutes'
                                            type='number'
                                            label="Minutos" 
                                            variant="outlined"
                                            onChange={funSetCustomizedDurantion}
                                            inputProps={{
                                                min: 0, 
                                                max: 59,
                                            }}
                                            required
                                        />
                                    </>
                                )
                            }
                        </FormControl>
                        <Button 
                            fullWidth
                            type='submit' 
                            variant="contained" 
                            color="primary" 
                            disabled={showErrorMessage}
                        >
                            Agregar tarea
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}

export default TaskForm;
