import mongoose from "mongoose";

export interface User {
  username: string;
  password: string;
}

export const User = mongoose.model<User>(
  "User",
  new mongoose.Schema<User>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  })
);
