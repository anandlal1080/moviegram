import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  synopsis: String,
  creator: String,
  tags: [String],
  imageUrl: String,
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  watch: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
