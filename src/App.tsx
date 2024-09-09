//=====================================================================================================================
//==========================================================// Productivity app
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { TaskProvider } from "./contexts/TaskContext"
import { Grid2, Typography, Box } from "@mui/material"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

//=====================================================================================================================
//==========================================================// App
function App() {

  //===================================================================================================================
  //========================================================// App template
  return (
    <>
      <TaskProvider>
        <div id="productivity-app" className="bg-blue">
          <header className="productivity-app__header">
            <Typography variant='h2' className="title fc-white">
              Arkon Productivity App
            </Typography>
          </header>
          <Box className="productivity-app__content">
            <Grid2 container spacing={2} sx={{display: "flex", justifyContent: "space-around"}}>
              <Grid2 xs={12}>
                <TaskForm></TaskForm>
              </Grid2>
              <Grid2 xs={12}>
                <TaskList></TaskList>
              </Grid2>
            </Grid2>
          </Box>
        </div>
      </TaskProvider>
    </>
  )
}

export default App
