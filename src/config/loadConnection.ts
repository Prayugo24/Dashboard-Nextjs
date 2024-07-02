import { connectToDB } from "./database";

export const LoadDB = async()=>{
    await connectToDB();
}
