//=====================================================================================================================
//==========================================================// App interfaces
//==========================================================// Code by: Raúl Langle

//-----------------------------------------------------------------------------------------------------------------
//                                                          // Task model
export interface Task {
    taskId: string;
    taskDate: Date;
    taskTitle: string;
    taskDescription: string;
    taskDuration: number;
    taskMinutes: number,
    taskHours: number,
    taskFinalDuration: number;
    taskCompletedDuration: number;
    isCompleted: boolean;
    isCustomDuration: boolean;
}