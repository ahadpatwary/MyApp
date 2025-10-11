import { Types } from "mongoose";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
  try {
    const { userId, cardId, property } = await req.json();

    await connectToDb();

    // ObjectId conversion
    const userObjectId = new Types.ObjectId(userId);
    const cardObjectId = new Types.ObjectId(cardId);

    // MongoDB query → check if cardId exists in likes array
    const alreadyLiked = !!(await User.exists({
      _id: userObjectId,
      [property]: cardObjectId
    }));

    return NextResponse.json({ liked: alreadyLiked }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ liked: false }, { status: 500 });
  }
};
