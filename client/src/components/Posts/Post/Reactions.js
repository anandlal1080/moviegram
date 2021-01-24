import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";

export const Likes = ({ post, user }) => {
  if (post.likes.length > 0) {
    return post.likes.find(
      (like) => like === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {post.likes.length}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{post.likes.length}
      </>
    );
  }
  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
    </>
  );
};

export const DisLikes = ({ post, user }) => {
  if (post.dislikes.length > 0) {
    return post.dislikes.find(
      (dislike) => dislike === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <ThumbDownAltIcon fontSize="small" />
        &nbsp;
        {post.dislikes.length}
      </>
    ) : (
      <>
        <ThumbDownAltOutlined fontSize="small" />
        &nbsp;{post.dislikes.length}
      </>
    );
  }
  return (
    <>
      <ThumbDownAltOutlined fontSize="small" />
    </>
  );
};

export const Watches = ({ post, user }) => {
  if (post.watch.length > 0) {
    return post.watch.find(
      (watch) => watch === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <VisibilityIcon fontSize="small" />
        &nbsp;
        {post.watch.length}
      </>
    ) : (
      <>
        <VisibilityOutlinedIcon fontSize="small" />
        &nbsp;{post.watch.length}
      </>
    );
  }
  return (
    <>
      <VisibilityOutlinedIcon fontSize="small" />
    </>
  );
};
