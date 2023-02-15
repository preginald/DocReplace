import mongoose from "mongoose";

// language schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// language model
export default mongoose.model("Language", schema);
