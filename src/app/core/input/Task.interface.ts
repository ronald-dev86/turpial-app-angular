export interface Task {
    id: string,
    IdUser: string,
    title: string,
    description: string,
    status: string,
    createdAt: Date ,
    updatedAt: Date,
    active: boolean
}