import mongoose, { Schema, Types } from "mongoose";

// TypeScript interface

interface ICard{
  user: Types.ObjectId;           // কে পোস্ট করেছে (User reference)
  image?: string;                 // পোস্টের ছবি
  title: string;                  // পোস্টের title
  description?: string;           // পোস্টের বর্ণনা
  cardLikes: Types.ObjectId[];    // যারা like করেছে (User reference)
  cardDislikes: Types.ObjectId[]; // যারা dislike করেছে (User reference)

  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const cardSchema = new Schema<ICard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    cardLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    cardDislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js
const Card =
  mongoose.models.Card || mongoose.model<ICard>("Card", cardSchema);

export default Card;
