import { Address } from './address';

export interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    addresses: Address[];
}
