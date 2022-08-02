import mongoose from "mongoose";

export default async () => {
  const URI = process.env.MONGODB_URI ?? "mongodb://root:example@localhost:27017/oidc";
  try {
    return mongoose.connect(URI, {});
  } catch (error) {
    console.error(error);
  }
};
