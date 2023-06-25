import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";


export const DELETE = async (request:Request, {params} : any) => {
    const {id} = params;
    try{
        await connect();

        await Post.findByIdAndDelete(id);

        return new NextResponse(JSON.stringify({message: 'Deleted successfully'}), {status: 200})
    } catch(err){
        return new NextResponse("Database Error", {status: 500})
    }
}