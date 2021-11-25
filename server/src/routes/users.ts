import { RequestHandler } from "express";
import { User } from "../models/User";

export const users: RequestHandler = async (_, res) => {
  const users = await User.find();
  res.json({ users });
};
