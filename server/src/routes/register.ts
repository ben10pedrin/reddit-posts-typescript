import { RequestHandler } from "express";
import { Error } from "../types";
import { User } from "../models/User";

export const register: RequestHandler = async (req, res) => {
  const errors: Error[] = [];
  const { username, password } = req.body;

  // Sanity check
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    errors.push({ field: "username", message: "invalid characters" });
  }
  if (username.length < 3) {
    errors.push({ field: "username", message: "must be at least 3" });
  }
  if (password.length < 3) {
    errors.push({ field: "password", message: "must be at least 3" });
  }

  if (errors.length > 0) {
    res.status(500).send({ errors });
    return;
  }

  // Actual insertion
  const user = new User({ username, password });
  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      errors.push({ field: "username", message: "username already exists" });
    }
  }

  if (errors.length > 0) {
    res.status(500).send({ errors });
    return;
  }
  res.json({ user });
};
