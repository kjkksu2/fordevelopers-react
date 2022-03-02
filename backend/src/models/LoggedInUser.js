import mongoose from "mongoose";

const loggedInUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("LoggedInUser", loggedInUserSchema);

export default model;
