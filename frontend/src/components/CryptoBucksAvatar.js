import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import useUserDataStore from "../store/userDataStore";
import profileImage from "../CryptoBucks.png";
import { Link } from "react-router-dom";
import VertNav from "./VertNav";
import SearchBar from "./SearchBar";

export default function CryptoBucksAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const cryptoBucks = useUserDataStore((state) => state.cryptoBucks);

  return (
    <>
      <Avatar
        alt="crypto-bucks-icon-image"
        style={{
          cursor: "pointer",
          background: "rgb(238, 188, 29)",
          marginRight: ".5em",
        }}
        src={profileImage}
        aria-describedby={id}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          style={{
            position: "relative",
            padding: "2em",
            display: "flex",
            gap: "2em",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img alt="crypto-bucks-icon" src={profileImage} style={{}} />
          <div>
            <h2 style={{ marginBottom: ".4em" }}>CryptoBucks</h2>
            <p style={{ color: "#B2BEB5", marginBottom: "1.4em" }}>
              You have {cryptoBucks} cryptobucks!
            </p>
            <Link
              style={{ color: "rgb(238, 188, 29)" }}
              to="/shop"
              onClick={handleClose}
            >
              <strong>GO TO SHOP</strong>
            </Link>
          </div>
        </Typography>
      </Popover>
      <h2
        style={{
          color: "rgb(238, 188, 29)",
          fontFamily: "din-round,sans-serif",
        }}
      >
        {cryptoBucks}
      </h2>
      <SearchBar />
      <VertNav />
    </>
  );
}
