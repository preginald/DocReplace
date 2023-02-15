import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  intro: {
    type: String,
    required: false,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: false,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
  },
});

const inputSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const stepSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

// doc schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
    },
    inputs: [inputSchema],
    steps: [stepSchema],
  },
  {
    timestamps: true,
  }
);

// doc model
export default mongoose.model("Doc", schema);
