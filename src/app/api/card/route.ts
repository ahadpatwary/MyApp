import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/db"
import Card from "@/models/Card"
import cloudinary from "@/lib/cloudinary"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import  { Types } from "mongoose"
import User from "@/models/User"


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  


    if (!Types.ObjectId.isValid(session.user.id)) {
      throw new Error("Invalid user id");
    }
    await connectToDb();

    // 🔹 User authentication check

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("content") as string;
    const picture = formData.get("picture") as File | null;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let imageUrl = "";

    // 🔹 যদি picture দেওয়া থাকে তাহলে Cloudinary তে upload করো
    if (picture) {
      const bytes = await picture.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await cloudinary.uploader.upload(
        `data:${picture.type};base64,${buffer.toString("base64")}`,
        { folder: "cards" }
      );

      imageUrl = uploadRes.secure_url;
    }
    const userId = session?.user?.id;
    console.log(userId);
    const userObjectId = new Types.ObjectId(userId); // convert to ObjectId
    console.log(userObjectId);

    // 1️⃣ User data fetch
    const user = await User.findById(userObjectId)
      .select("name picture")
 
    // 🔹 Database এ save
    const newCard = await Card.create({
      name: user.name,
      proPic: user.picture,
      title,
      description,
      image: imageUrl || "",
      user: new Types.ObjectId(session.user.id),
    });


    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    await User.findByIdAndUpdate(
      userObjectId,
      { $push: { cards: newCard._id } },
      { new: true }
    );

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error("Error creating card:", error);
    return NextResponse.json(
      { error: error || "Failed to create card" },
      { status: 500 }
    );
  }
}