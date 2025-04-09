import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    readMe: { type: String, required: true },

    githubRepoUrl: { type: String, required: true },

    deployedUrl: { type: String, default: "" }, // Optional

    media: [String], // Array of image/video URLs

    sdgMapping: [String], // Example: ['Quality Education', 'Clean Energy']


    likes: {
      type: Number,
      default: 0,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  { timestamps: true }
);


const Project = mongoose.model("Project", ProjectSchema );
export default Project;
