export default interface TeachnicianProps{
    techId: number,
    techName:string,
    roleId: number | null,
    roleName:string;
    salary: string|number|null,
    skills: string|null,
    contact: string|null,
    responsible: string|null
}