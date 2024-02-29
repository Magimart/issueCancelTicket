  
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/lib/types/userModel/userAuthTypes';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your namexxx'],
        maxLength: [50, 'Your name must be less 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [5, 'Your password must be longer than 6 characters'],
        select: false
    },   
    role: {
        type: String,
        default: 'user',
        enum:["user",'admin', 'root'] 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // resetPasswordToken: String, next stage
    // resetPasswordExpire: Date
});

//Encryp password if modified  and save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    } 
    this.password = await bcrypt.hash(this.password, 10)
});


//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model<UserModel>('User', userSchema)
