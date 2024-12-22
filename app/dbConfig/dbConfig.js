import mongoose from "mongoose";
export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("Connected to the database");
        })
        connection.on('error',()=>{
            console.log("Mongodb connection error! : "+err);
            process.exit();
        })
    }catch(error){
        console.log('Something went wrong in connecting to DB');
        console.log(error);
    }
}