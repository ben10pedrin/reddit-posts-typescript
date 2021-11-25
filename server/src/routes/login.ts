import { RequestHandler } from "express";
import { Error } from "../types";
import { User } from "../models/User";

export const login: RequestHandler = async (req, res) => {
  const errors: Error[] = [];
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user === null) {
    errors.push({ field: "username", message: "username doesn't exists" });
  } else {
    if (user.password !== password) {
      errors.push({ field: "password", message: "password doesn't match" });
    }
  }

  if (errors.length > 0) {
    res.status(500).send({ errors });
    return;
  }
  res.json({ user });
};
