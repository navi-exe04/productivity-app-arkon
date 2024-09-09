export interface Task {
    taskId: string;
    taskTitle: string;
    taskDescription: string;
    taskDuration: number;
    taskFinalDuration: number;
    isCompleted: boolean;
    isCustomDuration: boolean;
}