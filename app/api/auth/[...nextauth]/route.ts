import User from '@/models/User';
import connect from '@/utils/db';
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'



const handler = NextAuth({
    session:{
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id:"credentials",
            name: "credentials",
            type:"credentials",
            credentials: {
                email: { label: "email", type: "text"},
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                await connect();

                try {
                    const user = await User.findOne({
                        email: credentials!.email,
                    });

                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials!.password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error("wrong Credentials!");
                        }
                    } else {
                        throw new Error("User not found!")
                    }
                } catch (error) {
                    throw new Error(error as string)
                }

            }
        })
    ],
    callbacks:{
        async signIn({user, account, profile, email, credentials}){
            return true 
        }
    },
    pages:{
        signIn: "/dashboard/login",
        error: "/dashboard/login"
    }
})


export { handler as GET, handler as POST }