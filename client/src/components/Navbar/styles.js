import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    // display: "flex",
    // justifyContent: "flex-end",
    width: "100%",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down("md")]: {
    appBar: {
      flexDirection: "column",
    },
  },
  [theme.breakpoints.down("xs")]: {
    profile: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));
