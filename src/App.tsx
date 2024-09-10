//=====================================================================================================================
//==========================================================// Productivity app
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { useState } from "react";
import { TaskProvider } from "./contexts/TaskContext";
import { Typography, Box, Stack, Button } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import TaskChart from "./components/TaskChart";
import TabsComponent from "./components/subcomponents/TabsComponent";

//=====================================================================================================================
//==========================================================// App
function App() {

  const [appSection, setAppSection] = useState('timer')

  //===================================================================================================================
  //========================================================// App template
  return (
    <>
      <TaskProvider>
        <div id="productivity-app" className="bg-blue1">
          <header className="productivity-app__header">
            <Typography variant='h2' className="title fc-white">
              Arkon Productivity App
            </Typography>
          </header>
          <Box className="productivity-app__content">
            <div className="content-section">
              <div className="content-section__column">
                <TabsComponent 
                  tabsState={appSection} 
                  contentTabOne="Cronometro" 
                  contentTabTwo="Historial de tareas"
                  stateTabOne="timer"
                  stateTabTwo="chart"
                  funChangeState={setAppSection}
                />
                {
                  appSection == 'timer' ? (
                    <>
                      <Timer></Timer>
                      <TaskForm></TaskForm>
                    </>
                  )
                  : (
                    <TaskChart></TaskChart>
                  )
                }
              </div>
              <div className="content-section__column">
                <TaskList></TaskList>
              </div>
            </div>
          </Box>
        </div>
      </TaskProvider>
    </>
  )
}

export default App
