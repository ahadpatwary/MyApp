import { connectToDb } from "@/lib/db";
import { userIdClient } from "@/lib/userId"
import Card from "@/models/Card";
import { Types } from 'mongoose'
import { v2 as cloudinary } from "cloudinary";
import User from "@/models/User";
import { deleteFile } from "@/lib/deletePicture";
import { NextResponse } from "next/server";


export const DELETE = async () => {
    try {
        const userId = await userIdClient();

        if(!userId) {
            return NextResponse.json(
                { message: "userId not found" },
                { status: 404 }
            )
        }

        await connectToDb();

        const userObjectId = new Types.ObjectId(userId);

        const cards = await Card.find({user: userObjectId});

        const cloudinaryImagePublic_id = cards
            .map((card: ICard) => card?.image?.public_id )
            .filter(Boolean);

        if (cloudinaryImagePublic_id.length > 0) {
            await cloudinary.api.delete_resources(cloudinaryImagePublic_id);
        }

        await Card.deleteMany({ user: userId });

        const data = await User.findById(userObjectId).select("picture");

        if(!data) {
            return NextResponse.json(
                { message: "picture not found" },
                { status: 404 }
            )
        }

        await deleteFile(data?.picture?.url)

        await User.deleteOne({ _id: userObjectId });

        return NextResponse.json(
            { message: "Account Delete Successfully" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server Error"},
            { status : 500 }
        )
    }
}