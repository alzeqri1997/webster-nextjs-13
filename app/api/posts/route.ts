import Post from "@/models/Post";
import connect from "@/utils/db"
import { NextResponse } from 'next/server'



export const GET = async (request: Request) => {

    try {
        await connect();

        const posts = await Post.find();


        return new NextResponse(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 })
    }
}

export const POST = async (request: Request) => {
    const body = await request.json();

    try {

        await connect()

        await Post.insertMany(body).then(()=>{
            console.log('done successfully')
        }).catch((err)=>{
            console.log(err)
        })

        return new NextResponse("Post has been created", { status: 201 });

    } catch (err) {
        return new NextResponse("Database Error", { status: 500 })
    }
}