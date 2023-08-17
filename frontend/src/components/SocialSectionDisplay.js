import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

function SocialSectionDisplay({ following, follower, alignment }) {
  let history = useHistory();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "5ch",
      }}
    >
      {alignment === "following"
        ? following.map((fwing) => (
            <Grid
              item
              xs={12}
              onClick={() => history.push(`/user/${fwing?.followingUserName}`)}
              style={{ cursor: "pointer" }}
              key={fwing?.id}
            >
              <Card>
                <CardMedia
                  component="img"
                  image={fwing?.followingUserProfile}
                  alt={fwing?.followingUserName}
                  style={{ width: "100%", height: "200px" }}
                />
                <CardContent
                  style={{
                    color: "white",
                    background: "#424242",
                    padding: ".5rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center", fontFamily: "Raleway" }}
                  >
                    {fwing?.followingUserName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        : follower.map((fwer) => (
            <Grid
              item
              xs={12}
              onClick={() => history.push(`/user/${fwer?.followersUserName}`)}
              style={{ cursor: "pointer" }}
              key={fwer?.id}
            >
              <Card>
                <CardMedia
                  component="img"
                  image={fwer?.followerUserProfile}
                  alt={fwer?.followersUserName}
                  style={{ width: "100%", height: "200px" }}
                />
                <CardContent
                  style={{
                    color: "white",
                    background: "#424242",
                    padding: ".5rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center", fontFamily: "Raleway" }}
                  >
                    {fwer?.followersUserName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
    </div>
  );
}

export default SocialSectionDisplay;
