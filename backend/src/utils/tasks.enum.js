export const TaskStatus = {
    todo: "ToDo",
    inprogress: "InProgress",
    check: "InCheck",
    completed: "Completed"
}

export const PriorityStatus = {
    p0: "P0",
    p1: "P1",
    p3: "P3",
    p4: "P4"
}

export const TaskEnum = Object.values(TaskStatus)
export const PriorityEnum = Object.values(PriorityStatus)