import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import Card from "@/models/Card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Types } from "mongoose";

export async function GET() {
  try {
    await connectToDb();

    // ✅ Session থেকে user id বের করা
    const session = await getServerSession(authOptions);
    if (!session || !session.user.id ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id; // string from session
    const userObjectId = new Types.ObjectId(userId); // convert to ObjectId

    // 1️⃣ User data fetch
    const user = await User.findById(userObjectId)
      .select("picture")
      .populate("cards")
      .populate("likedCards")
      .populate("savedCards");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2️⃣ All cards fetch
    const allCards = await Card.find();

    // 3️⃣ Filter only active cards
    const activeAllCards = allCards.filter(card => card.videoPrivacy === "public");
    const myPostActiveCards = user.cards.filter((card: ICard) => card.videoPrivacy === "public");
    const activeLikedCards = user.likedCards.filter((card: ICard) => card.videoPrivacy === "public");
    const activeSavedCards = user.savedCards.filter((card: ICard) => card.videoPrivacy === "public");

    // 4️⃣ Return
    return NextResponse.json({
      picture: user.picture,
      session: userObjectId, 
      activeCards: activeAllCards,
      myPost: user.cards,
      myActivePost: myPostActiveCards,
      likedCards: activeLikedCards,
      savedCards: activeSavedCards,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching filtered cards:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}