import mongoose from "mongoose";

const connect = async ()=>{
    try{
        await  mongoose.connect(process.env.MONGODB_URI as string)
    } catch(error){
        console.error(error)
    }
}

export default connect;