import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "./styles";
const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    synopsis: "",
    tags: "",
    imageUrl: "",
  });
  const classes = useStyles();

  const handleSubmit = () => {};
  const clear = () => {};

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Movie</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullwidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullwidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="synopsis"
          variant="outlined"
          label="synopsis"
          fullwidth
          value={postData.synopsis}
          onChange={(e) =>
            setPostData({ ...postData, synopsis: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullwidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={([base64]) =>
              setPostData({ ...postData, imageUrl: base64 })
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
        </div>
      </form>
    </Paper>
  );
};

export default Form;
