//=====================================================================================================================
//==========================================================// Productivity app
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { TaskProvider } from "./contexts/TaskContext";
import { Grid2, Typography, Box } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";

//=====================================================================================================================
//==========================================================// App
function App() {

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
                <Timer></Timer>
                <TaskForm></TaskForm>
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
