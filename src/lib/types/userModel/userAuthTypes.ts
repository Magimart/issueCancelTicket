import mongoose from 'mongoose';


export interface UserModel extends mongoose.Document{
    name:string;
    email: string;
    password: string;  
    role:string;
    createdAt: Date;
    // resetPasswordToken: String;
    // resetPasswordExpire: Date;
}












