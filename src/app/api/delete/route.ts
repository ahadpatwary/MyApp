import { NextResponse } from 'next/server'
import { connectToDb } from '@/lib/db'
import Card from '@/models/Card'
import User from '@/models/User'
import { Types } from 'mongoose'
import { deleteFile } from '@/lib/deletePicture'

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
        const Model = model === 'User' ? User : Card;

        const data = await Model.findById(objectId).select("image");

        if (!data || !data.image) {
            return NextResponse.json(
                { message: "image data is missing" },
                { status : 404 }
            )
        }

        const publicId = data.image.public_id;
        await deleteFile(publicId);

        await Card.findOneAndDelete({ _id: objectId });

        const deletedId = await Model.findByIdAndDelete(objectId) ;
  

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