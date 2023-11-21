export interface ITProfession {
    id: number;
    description: string;
}

export interface User {
    name: string;
    cpf: string;
    email: string;
    birthday: Date;
    profession: ITProfession;
}

export interface Gender {
    id: number;
    name: string;
}
