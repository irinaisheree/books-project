import { User } from "./user"

export interface Book {
   _id: string;
   title: string;
   author: string;
   price: number;
   imageUrl: string;
   description: string;
   creator: User;
   likes: number;
   liked: boolean
 }