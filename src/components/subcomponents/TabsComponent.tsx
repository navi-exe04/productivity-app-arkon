//=====================================================================================================================
//==========================================================// Tabs component
//==========================================================// Code by: Raúl Langle

//=====================================================================================================================
//==========================================================// Import modules
import { Stack, Button } from "@mui/material";

//=====================================================================================================================
//==========================================================// Props interface
interface TabsComponentProps {
    tabsState: string;
    contentTabOne: string;
    contentTabTwo: string;
    stateTabOne: string;
    stateTabTwo: string;
    funChangeState: (value: string) => void;
}

//=====================================================================================================================
//==========================================================// Component
const TabsComponent = ({ 
    tabsState, 
    contentTabOne, 
    contentTabTwo,
    stateTabOne, 
    stateTabTwo, 
    funChangeState 
} : TabsComponentProps) => {
    return (
        <div className='tabs-component'>
            <Stack direction="row" spacing={2}>
                <Button 
                    className={'tabs-component__btn' + `${tabsState == stateTabOne ? " active" : ""}`} 
                    variant="contained" 
                    onClick={() => funChangeState(stateTabOne)}
                >
                    { contentTabOne }
                </Button>
                <Button 
                    className={'tabs-component__btn' + `${tabsState == stateTabTwo ? " active" : ""}`} 
                    variant="contained" 
                    onClick={() => funChangeState(stateTabTwo)}
                >
                    { contentTabTwo }
                </Button>
            </Stack>
        </div>
    );
}

export default TabsComponent;
