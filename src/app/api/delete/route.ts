import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Card from "@/models/Card";
import User from "@/models/User";
import { Types } from "mongoose";
import { deleteFile } from "@/lib/deletePicture";

interface ReqType {
  model: "User" | "Card";
  id?: string;
}

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { model, id }: ReqType = body;

    if (!model || !id) {
      return NextResponse.json(
        { message: "Model or ID is missing" },
        { status: 400 }
      );
    }

    await connectToDb();

    const objectId = new Types.ObjectId(id);
    const Model = model === "User" ? User : Card;

    // প্রথমে document fetch করো (lean() ব্যবহার করা যাবে না)
    const data = await Model.findById(objectId).select("image");

    if (!data) {
      return NextResponse.json(
        { message: "Data not found" },
        { status: 404 }
      );
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
      { message: "Invalid model" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error deleting ID", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
