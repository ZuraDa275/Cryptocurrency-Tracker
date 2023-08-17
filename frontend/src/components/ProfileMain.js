import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiPaper-root,& .MuiAppBar-root,& .MuiAppBar-positionStatic ,& .MuiAppBar-colorPrimary ,& .MuiPaper-elevation4":
      {
        backgroundColor: "rgb(238, 188, 29)",
      },
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "black",
    fontFamily: "Montserrat",
    cursor: "pointer",
  },
}));

export default function ProfileMain({ setSection }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ textAlign: "center" }}>
        <Toolbar>
          <Typography
            onClick={(e) => setSection(e)}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Tracked Cryptos
          </Typography>
          <Typography
            onClick={(e) => setSection(e)}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Investments
          </Typography>
          <Typography
            onClick={(e) => setSection(e)}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Social
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
