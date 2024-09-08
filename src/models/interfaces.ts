export interface Task {
    taskId: string;
    taskTitle: string;
    taskDescription: string;
    taskDuration: number;
    isCompleted: boolean;
    isCustomDuration: boolean;
}