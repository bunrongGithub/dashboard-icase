export type AppErrorsType = {
    statusCode: number;
    message: string;
}
export const appErrors = ({statusCode,message}: AppErrorsType) => {
    return {statusCode,message}
}
