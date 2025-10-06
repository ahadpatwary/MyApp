import mongoose, { Schema } from "mongoose";

// TypeScript interface



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
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "There are no description here!",
    },
    cardLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    videoPrivacy: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
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
