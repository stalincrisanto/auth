import mongoose from "mongoose";
import { config } from "../../config";

export default async () => {
  const URI = config.MONGODB_URI;
  try {
    return mongoose.connect(URI, {});
  } catch (error) {
    console.error(error);
  }
};
