import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";


// ---------------------------
// POST handler
// ---------------------------
export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    // ---------------------------
    // Get userId from JWT or NextAuth session
    // ---------------------------
    let userId: string | undefined;

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      userId = decoded.id;
    }

    if (!userId) {
      const session = await getServerSession(authOptions);
      if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      userId = session.user.id;
    }

    // ---------------------------
    // Extract form data
    // ---------------------------
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const dob = formData.get("dob")?.toString();
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const pictureFile = formData.get("picture") as File | null;

    // ---------------------------
    // Upload picture to Cloudinary if exists
    // ---------------------------
    let pictureUrl: string | null = null;
    if (pictureFile) {
      const arrayBuffer = await pictureFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadRes = await cloudinary.uploader.upload(
        `data:${pictureFile.type};base64,${buffer.toString("base64")}`,
        { folder: "user_pictures" }
      );
      pictureUrl = uploadRes.secure_url;
    }

    // ---------------------------
    // Update user in DB
    // ---------------------------
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(dob && { dob }),
        ...(phoneNumber && { phoneNumber }),
        ...(pictureUrl && { picture: pictureUrl }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: error}, { status: 500 });
  }
}

// ---------------------------
// Disable default body parser
// ---------------------------
export const config = {
  api: {
    bodyParser: false,
  },
};