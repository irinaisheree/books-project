import { Book } from "./book";

export interface User{
    

    books: Book[];
    _id: string;
    email: string;
    username: string;
    password: string;

}