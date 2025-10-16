import mongoose, { Schema, Document, Types } from "mongoose";
import User from "@/models/User";

export interface ICard extends Document {
  user: Types.ObjectId;
  name: string;
  proPic?: { url: string; public_id: string };
  image?: { url: string; public_id: string };
  title: string;
  description: string;
  videoPrivacy: "public" | "private";
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    proPic: {
      url: { type: String },
      public_id: { type: String },
    },
    image: {
      url: { type: String },
      public_id: { type: String },
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
    videoPrivacy: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

// Pre-remove hook: remove references from Users
<<<<<<< HEAD
    cardSchema.pre("remove", async function (next: mongoose.HookNextFunction) {
      try {
        const card = this as ICard; // <-- type assertion
        const cardId = card._id;

        await User.updateMany({ cards: cardId }, { $pull: { cards: cardId } });
        await User.updateMany({ likedCards: cardId }, { $pull: { likedCards: cardId } });
        await User.updateMany({ savedCards: cardId }, { $pull: { savedCards: cardId } });

        next();
      } catch (err) {
        next(err);
      }
    });
=======
cardSchema.pre("findOneAndDelete", async function (next) {
  try {
    const cardId = this.getQuery()._id;
    await User.updateMany({ cards: cardId }, { $pull: { cards: cardId } });
    await User.updateMany({ likedCards: cardId }, { $pull: { likedCards: cardId } });
    await User.updateMany({ savedCards: cardId }, { $pull: { savedCards: cardId } });
    next();
  } catch (err) {
    next(err);
  }
});
>>>>>>> fa8edc50025358f38509a489f1c49c171961cc33

// Prevent model overwrite in Next.js
const Card = mongoose.models.Card || mongoose.model<ICard>("Card", cardSchema);
export default Card;