import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";

export const Likes = ({ likecounter }) => {
  if (likecounter % 2 === 0) {
    likecounter = likecounter + 1;
    return <ThumbUpAltOutlined fontSize="small" />;
  } else {
    likecounter = likecounter + 1;
    return <ThumbUpAltIcon fontSize="small" />;
  }
};

export const DisLikes = ({ disLikecounter }) => {
  if (disLikecounter % 2 === 0) {
    disLikecounter = disLikecounter + 1;
    return <ThumbDownAltOutlined fontSize="small" />;
  } else {
    disLikecounter = disLikecounter + 1;
    return <ThumbDownAltIcon fontSize="small" />;
  }
};

export const Watches = ({ watchcounter }) => {
  if (watchcounter % 2 === 0) {
    watchcounter = watchcounter + 1;
    return <VisibilityOutlinedIcon fontSize="small" />;
  } else {
    watchcounter = watchcounter + 1;

    return <VisibilityIcon fontSize="small" />;
  }
};
