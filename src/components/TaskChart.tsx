//=====================================================================================================================
//==========================================================// Tasks chart componet
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import { useTaskContext } from '../contexts/TaskContext';
import { format } from 'date-fns';
import { Task } from '../models/interfaces';
import { Box, Paper, Typography } from '@mui/material';

//=====================================================================================================================
//==========================================================// Component
const TaskChart = () => {
    //=================================================================================================================
    //======================================================// Component state
    const { state } = useTaskContext();
    //                                                      // Filter the tasks of last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const tasksLastWeek = state.tasks.filter((task: Task) => task.taskDate >= oneWeekAgo && task.isCompleted);
    
    //                                                      // Count the tasks by day
    const tasksByDay = tasksLastWeek.reduce((acc: Record<string, number>, task: Task) => {
        const day = format(task.taskDate, 'yyyy-MM-dd');
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});

    //                                                      // Format data for victory chart
    const data = Object.keys(tasksByDay).map(day => ({
        x: day,
        y: tasksByDay[day]
    }));

    //=================================================================================================================
    //======================================================// Component template
    return (
        <Box id="task-chart">
            <Paper elevation={4} className='container'>
                {
                    data.length <= 0 ? (
                        <Typography variant="h5" className='title fc-blue-1'>
                            No hay datos suficientes para mostrar el historial. 😔
                        </Typography>
                    )
                    : (
                        <>
                            <Typography variant="h5" className='title fc-blue-1'>
                                Historial de tareas realizadas
                            </Typography>
                            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                                <VictoryAxis
                                    tickValues={Object.keys(tasksByDay)}
                                    style={{
                                        tickLabels: {angle: -40, padding: 15}
                                    }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    label="Tareas completadas"
                                    tickFormat={(y) => Math.floor(y)}
                                    style={{
                                        axisLabel: {padding: 40},
                                        ticks: {stroke: "grey", size: 5},
                                        tickLabels: {padding: 15}
                                    }}
                                />
                                <VictoryBar
                                    data={data}
                                    x="x"
                                    y="y"
                                    barWidth={15}
                                    style={{
                                        data:{fill:"#06d6a0"}
                                    }}
                                />
                            </VictoryChart>
                        </>
                    )
                }
            </Paper>
        </Box>
    );
}

export default TaskChart;
