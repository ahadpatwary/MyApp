import { NextResponse } from 'next/server'
import { connectToDb } from '@/lib/db'
import Card from '@/models/Card'
import User from '@/models/User'
import { Types } from 'mongoose'

interface reqType {
    model : "User" | "Card";
    id : string | undefined;
}

export const DELETE = async (req : Request) => {

    try{

        const body = await req.json();
        const { model, id }: reqType = body;
        
        if(!model || !id ){
            return NextResponse.json(
                { message : "id or model is missing"},
                { status : 400 }
            )
        }

        await connectToDb();

        const objectId = new Types.ObjectId(id);

        const deletedId = (model === "User") ?
            await User.findByIdAndDelete(objectId) : 
            await Card.findByIdAndDelete(objectId)
        ;

        if(!deletedId){
            return NextResponse.json(
                { message : "Id not found!"},
                { status : 404 }
            )
        }

        return NextResponse.json(
            { message: "deleted successfully"},
            { status : 200 }
        )

    } catch(error){
        console.error("Error deleting ID", error);

        return NextResponse.json(
            { message : "Internal server error"},
            { status : 500 }
        )
    }
}