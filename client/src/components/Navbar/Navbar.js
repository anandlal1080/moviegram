import React, { useState, useEffect } from "react";
import { FETCH_ALL } from "../../constants/actionTypes";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Typography,
  CardActions,
  Toolbar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";
import { Likes, DisLikes, Watches } from "./Reactions.js";
import { getPosts } from "../../actions/posts";
import icon from "../../images/movie-night.png";
import { useStoreContext } from "../../reducers/search";
import { CLEAR_SEARCH } from "../../constants/actionTypes";

let likecounter = 0;
let disLikecounter = 0;
let watchcounter = 0;
const Navbar = () => {
  const dataToFilter = useSelector((state) => state.posts);
  const [state, clearState] = useStoreContext();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let id = "";
  const likeFilter = () => {
    if (user.result.googleId) {
      id = user.result.googleId;
    } else {
      id = user.result._id;
    }

    const r = dataToFilter.filter((d) => d.likes.includes(id));
    likecounter = likecounter + 1;
    if (likecounter % 2 === 0) {
      console.log(likecounter, "like if statement");
      dispatch(getPosts());
    } else {
      dispatch({ type: FETCH_ALL, payload: r });
      console.log(likecounter, "like else statement");
    }
  };
  const disLikeFilter = () => {
    if (user.result.googleId) {
      id = user.result.googleId;
    } else {
      id = user.result._id;
    }
    const r = dataToFilter.filter((d) => d.dislikes.includes(id));
    disLikecounter = disLikecounter + 1;

    console.log(disLikecounter, "above dislike if statement");
    if (disLikecounter % 2 === 0) {
      console.log(disLikecounter, " if dislike statement");
      dispatch(getPosts());
    } else {
      dispatch({ type: FETCH_ALL, payload: r });
      console.log(disLikecounter, "dislike else statement");
    }
  };
  const watchFilter = () => {
    if (user.result.googleId) {
      id = user.result.googleId;
    } else {
      id = user.result._id;
    }
    const r = dataToFilter.filter((d) => d.watch.includes(id));
    watchcounter = watchcounter + 1;

    console.log(watchcounter, "watchcounter above if statement");
    if (watchcounter % 2 === 0) {
      console.log(watchcounter, "watch if statement");
      dispatch(getPosts());
    } else {
      dispatch({ type: FETCH_ALL, payload: r });
      console.log(watchcounter, "watch else statement");
    }
  };

  const logout = () => {
    clearState({
      type: CLEAR_SEARCH,
    });

    dispatch({ type: "LOGOUT" });
    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Moviegram
        </Typography>
        <img className={classes.image} src={icon} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary" onClick={() => likeFilter()}>
                <Likes likecounter={likecounter} />
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => disLikeFilter()}
              >
                <DisLikes disLikecounter={disLikecounter} />
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => watchFilter()}
              >
                <Watches watchcounter={watchcounter} />
              </Button>
            </CardActions>
            <div>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
            </div>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
