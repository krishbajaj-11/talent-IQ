import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";


//This initializes the Inngest client for registering event-driven functions.
export const inngest= new Inngest({id:"talent_IQ"});

const syncUser= inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async({event})=>{
        await connectDB();  //Background jobs need independent DB connection handling

        const{id,email_addresses,first_name,last_name,image_url}=event.data; //destructure user data from event

        const newUser={
            clerkId:id,
            email:email_addresses[0]?.email_address,
            name:`${first_name||""} ${last_name||""}`,
            profileImage:image_url||""
        }


       await User.create(newUser);//Inserts user into database ,Happens automatically after signup


       await upsertStreamUser({
        id:newUser.clerkId.toString(),
        name:newUser.name,
        image:newUser.profileImage
       })
    }
)

const deleteUserFromDB= inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        await connectDB();
        const{id}=event.data; //destructure user data from event

       await User.deleteOne({clerkId:id});

       await deleteStreamUser(id.toString());
    }
)

export const functions=[syncUser,deleteUserFromDB];