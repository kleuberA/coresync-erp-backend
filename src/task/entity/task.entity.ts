export enum TaskStatus {
    'OPEN',
    'TODO',
    'IN_PROGRESS',
    'REVIEW',
    'DONE',
}

export class Task {
    id: string;
    name: string;
    projectId: string;
    assigneeId: string;
    creatorId: string;
    start_date: Date;
    end_date: Date;
    active: boolean;
    status: string;
}
