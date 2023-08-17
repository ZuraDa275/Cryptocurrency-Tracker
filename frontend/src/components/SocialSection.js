import React, { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SocialSectionDisplay from "./SocialSectionDisplay";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "rgba(238, 188, 29,0.7);",
    // width: theme.spacing(120),
    height: theme.spacing(12),
    color: "white",
  },
  toggleButtons: {
    color: "white",
    fontFamily: "Montserrat",
  },
  noFollowH1Tag: {
    fontFamily: "Montserrat",
    alignSelf: "center",
  },
}));

function SocialSection({ routeFollowing, routeFollower }) {
  const classes = useStyles();
  const [alignment, setAlignment] = useState("following");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <div
      style={{
        marginLeft: "2em",
        marginTop: "2em",
        display: "flex",
        gap: "10ch",
        overflow: "hidden",
      }}
    >
      {/* First column */}
      <Paper className={classes.paper}>
        <ToggleButtonGroup
          orientation="vertical"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="Following and Followers"
        >
          <ToggleButton className={classes.toggleButtons} value="following">
            Following
          </ToggleButton>
          <ToggleButton className={classes.toggleButtons} value="followers">
            Followers
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      {/* Second column */}
      {alignment === "following" && routeFollowing.length === 0 ? (
        <h1 className={classes.noFollowH1Tag}>Following 0 users!</h1>
      ) : alignment === "followers" && routeFollower.length === 0 ? (
        <h1 className={classes.noFollowH1Tag}>No Followers!</h1>
      ) : (
        <SocialSectionDisplay
          following={routeFollowing}
          follower={routeFollower}
          alignment={alignment}
        />
      )}
    </div>
  );
}

export default SocialSection;
