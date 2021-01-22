import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  synopsis: String,
  creator: String,
  tags: [String],
  imageUrl: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
