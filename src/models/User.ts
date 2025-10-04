import mongoose, { Schema, Types } from "mongoose"
import bcrypt from 'bcryptjs'

// TypeScript interface
interface IUser {
  name: string;
  email: string;
  password:string;
  phoneNumber: string;
  picture: string;
  dob: Date;

  // Relations
  cards: Types.ObjectId[];
  likedCards: Types.ObjectId[];
  dislikedCards: Types.ObjectId[];
  savedCards: Types.ObjectId[];

  // Status
  isActive: boolean;
  videoPrivacy: "public" | "private";

  // Statistics
  totalLikes: number;
  totalDislikes: number;
  totalPosts: number;

  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
      type: String,
    },
    picture: {
      type: String,
    },
    dob: {
      type: Date,
    },

    // Relations
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    likedCards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    dislikedCards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    savedCards: [{ type: Schema.Types.ObjectId, ref: "Card" }],

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    videoPrivacy: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    // Statistics
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalDislikes: {
      type: Number,
      default: 0,
    },
    totalPosts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }catch(err){
            console.error(err);
            console.log("ksdjfksdfjks");
            throw err;
        }
    }
    next();
})

// Prevent model overwrite (for Next.js hot reload)
const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
