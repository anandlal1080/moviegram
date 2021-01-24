import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useStoreContext } from "../../reducers/search";
import { useDispatch } from "react-redux";
import { API_CALL, CLEAR_SEARCH } from "../../constants/actionTypes";

import useStyles from "./styles";
import { createPost } from "../../actions/posts";

const MovieSearch = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, apiDispatch] = useStoreContext();
  const [movieName, setmovieName] = useState({
    title: "",
  });
  const [postData, setPostData] = useState({
    title: "",
    synopsis: "",
    tags: "",
    imageUrl: "",
  });

  const Base_URL = "https://www.omdbapi.com/?apikey=461e66e0&s=";
  const Title_URL = "https://www.omdbapi.com/?apikey=461e66e0&i=";

  const handleApiSubmit = (e) => {
    e.preventDefault();
    const query = Base_URL + movieName.title;

    fetch(query)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.Search.length > 0) {
          apiDispatch({
            type: API_CALL,
            payload: data,
          });
        }
        console.log(state);
      })
      .catch((err) => console.log(err));

    setmovieName({ title: "" });
  };

  const handleMovieSelect = ({ imdbID }) => {
    const query = Title_URL + imdbID;

    fetch(query)
      .then((data) => data.json())
      .then((data) => {
        if (currentId === 0) {
          const postData2 = {
            title: data.Title,
            synopsis: data.Plot,
            tags: data.Genre.split(", "),
            imageUrl: data.Poster,
          };

          dispatch(createPost({ ...postData2, name: user?.result?.name }));
          clear();
        }
      })
      .catch((err) => console.log(err));

    setmovieName({ title: "" });
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      synopsis: "",
      tags: "",
      imageUrl: "",
    });
    apiDispatch({
      type: CLEAR_SEARCH,
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to participate in the Watchlist
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleApiSubmit}
      >
        <Typography variant="h6">Search for a Movie</Typography>
        <TextField
          name="movie"
          variant="outlined"
          label="Enter movie name here..."
          fullWidth
          value={movieName.title}
          onChange={(e) =>
            setmovieName({ ...movieName, title: e.target.value })
          }
        />

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {state.searchResults.map((movie) => (
          <ListItem
            divider
            key={movie.imdbID}
            button
            onClick={() => {
              handleMovieSelect(movie);
            }}
          >
            <ListItemText primary={movie.Title + " " + movie.Year} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MovieSearch;
