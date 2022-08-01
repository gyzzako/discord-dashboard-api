import mongoose from "mongoose";

mongoose.connect(<string>process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error(err));