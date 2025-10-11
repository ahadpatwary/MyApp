import { Types } from 'mongoose';
import { connectToDb } from "@/lib/db";
import User from '@/models/User'; 
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    let { cardId, userId, property } = body;

    await connectToDb();

    cardId = new Types.ObjectId(cardId);
    userId = new Types.ObjectId(userId);

    // Check if user already liked this card
    const alreadyLiked = !!(await User.exists({
      _id: userId,
      [property]: cardId
    }));

    let updatedUser;

    if (alreadyLiked) {
      // Remove cardId from likes
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { [property]: cardId } },
        { new: true }
      );
    } else {
      // Add cardId to likes array
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { [property]: cardId } },
        { new: true }
      );
    }

    return NextResponse.json(
        { 
            liked: !alreadyLiked,
            user: updatedUser
        },
        { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};