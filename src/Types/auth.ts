import { IError } from "./error";

export interface IAuth extends IError{
    payload: {token?: string} | undefined;
}

export interface ISignInFields {
    login: string;
    password: string;
}

export interface IFromikSubmitting{
    setSubmitting: (data: boolean)=> void;
}