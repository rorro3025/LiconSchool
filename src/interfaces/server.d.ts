interface SuccessTask {
    success: true
}

interface FailedTask {
    success: false
    message: string
}


export type TaskResult<E extends SuccessTask> = FailedTask | E