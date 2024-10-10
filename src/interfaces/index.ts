export interface TermOwnerI {
    description: string;
    type: string;
}


export interface EditTermOwnerI extends TermOwnerI {
    uuid: string;
    updatedAt:string
}