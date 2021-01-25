import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Typography,
  CardActions,
  Toolbar,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";
import { Likes, DisLikes, Watches } from "./Reactions.js";

import icon from "../../images/movie-night.png";
import { useStoreContext } from "../../reducers/search";
import { CLEAR_SEARCH } from "../../constants/actionTypes";

const Navbar = () => {
  const [state, clearState] = useStoreContext();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
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
              <Button
                size="small"
                color="primary"
                // onClick={() => dispatch(findLikedPosts(user._id))}
              >
                <Likes user={user} />
              </Button>
              <Button
                size="small"
                color="primary"
                // onClick={() => dispatch(dislikePost(post._id))}
              >
                <DisLikes user={user} />
              </Button>
              <Button
                size="small"
                color="primary"
                // onClick={() => dispatch(watchPost(post._id))}
              >
                <Watches user={user} />
              </Button>
            </CardActions>
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
