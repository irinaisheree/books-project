import { Book } from "./book";

export interface User{
    

    paintings: Book[];
    _id: string;
    email: string;
    username: string;
    password: string;

}