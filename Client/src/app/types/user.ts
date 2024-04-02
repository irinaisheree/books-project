import { Book } from "./book";

export interface User{
    
    _id: string;
    email: string;
    password: string;
    token: string;
    books?: Book[]
    liked?: Book[]

}

export interface UserForAuth extends User {
 
    _id: string;
    email: string;
    password: string;
    token: string;
    books?: Book[]
    liked?: Book[]
  }