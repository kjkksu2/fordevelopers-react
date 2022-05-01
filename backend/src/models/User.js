import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    // required: true,
  },
  introduction: {
    type: String,
    default: "Introduce yourself!",
  },
  image_url: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    // required: true,
  },
  goToSchool: {
    type: String,
    // required: true,
  },
  heart: {
    type: Number,
    default: 0,
  },
  heart_clicked_user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  visit: {
    type: Number,
    default: 0,
  },
  visit_time: {
    type: Number,
  },
  choice: [
    {
      id: mongoose.Schema.Types.ObjectId,
      kinds: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  dev: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dev",
    },
  ],
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("User", userSchema);

export default model;
