//=====================================================================================================================
//==========================================================// Timer component
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Box, Paper, Typography, Button } from '@mui/material';

//=====================================================================================================================
//==========================================================// Componente
const Timer = () => {
    //=================================================================================================================
    //======================================================// Component state
    const { state, dispatch } = useTaskContext();
    const [inProgress, setInProgress] = useState(false);

    //=================================================================================================================
    //======================================================// Effects and functions

    //-----------------------------------------------------------------------------------------------------------------
    //                                                      //
    
    //=================================================================================================================
    //======================================================// Component template
    return (
        <Box id="tasks-timer">
            <Paper 
                elevation={4} 
                className={'timer-container container' + `${inProgress ? ' bg-green' : ' bg-orange'}`}
            >
                {
                    state.selectedTask === undefined ? (
                        <Typography className='timer-container__context'>
                            Selecciona una tarea para iniciarla. 😄
                        </Typography>
                    ) 
                    : (
                        <>
                            <div className='timer-container__info'>
                                <Typography variant='h5' className='title fw-bolder'>
                                    { state.selectedTask.taskTitle }
                                </Typography>
                            </div>
                            <div className='timer-container__timer'>
                                {
                                    !inProgress ? (
                                        <Typography variant='h6' className='title fc-blue-1'>
                                            TAREA DETENIDA
                                        </Typography>
                                    )
                                    : (
                                        <Typography variant='h6' className='title fc-blue-1'>
                                            TAREA INICIADA
                                        </Typography>
                                    )
                                }
                            </div>
                            <div className='timer-container__options'>
                                {
                                    !inProgress ? (
                                        <Button
                                            title='Comenzar tarea'
                                            sx={{background:"#06d6a0"}} 
                                            onClick={() => setInProgress(true)} 
                                        >
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>
                                        </Button>
                                    )
                                    : (
                                        <Button
                                            title='Pausando tarea'
                                            sx={{background:"#eb5e28"}} 
                                            onClick={() => setInProgress(false)} 
                                        >
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" stroke="#ffffff" strokeWidth="1.5"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" stroke="#ffffff" strokeWidth="1.5"></path> </g></svg>
                                        </Button>
                                    )
                                }
                                <Button 
                                    title='Reiniciar tarea'
                                    sx={{background:"#ffbc42"}} 
                                    onClick={() => alert('Reiniciando tarea...')}
                                >
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 1.29289C14.0976 1.68342 14.0976 2.31658 13.7071 2.70711L12.4053 4.00896C17.1877 4.22089 21 8.16524 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 12.4477 3.44772 12 4 12C4.55228 12 5 12.4477 5 13C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13C19 9.2774 16.0942 6.23349 12.427 6.01281L13.7071 7.29289C14.0976 7.68342 14.0976 8.31658 13.7071 8.70711C13.3166 9.09763 12.6834 9.09763 12.2929 8.70711L9.29289 5.70711C9.10536 5.51957 9 5.26522 9 5C9 4.73478 9.10536 4.48043 9.29289 4.29289L12.2929 1.29289C12.6834 0.902369 13.3166 0.902369 13.7071 1.29289Z" fill="#ffffff"></path> </g></svg>
                                </Button>
                                <Button 
                                    title='completar tarea'
                                    sx={{background:"#3a86ff"}} 
                                    onClick={() => alert('Terminando tarea...')}
                                >
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#ffffff"></path> </g></svg>
                                </Button>
                            </div>
                        </>
                    )
                }
            </Paper>
        </Box>
    );
}

export default Timer;
