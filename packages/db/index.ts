import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
    required: true,
  },
});

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("Users", UserSchema);
export const ResourceModel = mongoose.model("Rescorces", ResourceSchema);
