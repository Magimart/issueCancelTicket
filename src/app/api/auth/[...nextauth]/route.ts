import CredentialProviders from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/usersModel';
import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from "next"

import bcrypt from 'bcryptjs';
import type { UserModel } from '@/lib/types/userModel/userAuthTypes';

interface Authorize{}
type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

interface Credentials{
    email: string;
    password: string;
}

async function auth(req: CombineRequest, res: CombineResponse){ 

    return await NextAuth(req, res, {
        session: {
            strategy: "jwt",
        },
        providers: [
            CredentialProviders({
            // @ts-ignore
                async authorize(credentials: Credentials): Promise<any>{
                    await dbConnect();

                const { email, password } = credentials;
                if (!email || !password) {
                    throw new Error('Invalid email or password');
                }
                const user = await User.findOne({ email }).select('+password')
                if (!user) {
                    throw new Error('Invalid Email or Password')
                }
    
                // Check if password is correct or not
                const isPasswordMatched = await bcrypt.compare(password, user.password);

                if (!isPasswordMatched) {
                    throw new Error('Invalid Email or Password')
                }
                    //return user ;                    
                   return Promise.resolve(user);

                } 
               ,
            })
        ],
        callbacks: {
            jwt: async ({token, user}) => {
                user && (token.user = user);
                 return Promise.resolve(token) // trurn token)
                //return token;
            },

            session: async ({session, token}) => {
                session.user = token.user as UserModel;
                //@ts-ignore
                 delete session.user?.password;                
                //return session;
                return Promise.resolve(session)
            }
        },
        secret: process.env.NEXTAUTH_SECRECT,
       // database: process.env.DATABASE_CLOUD  
       // debug: true,      
    })
}

export { auth as GET, auth as POST};
  



