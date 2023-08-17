import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import ShopIcon from "@material-ui/icons/Shop";
import { Link, useHistory } from "react-router-dom";
import useUserDataStore from "../store/userDataStore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useLogoutUser } from "../hooks/logout";
import SendCryptoBucksModal from "./SendCryptoBucksModal";

const StyledMenu = withStyles({
  paper: {
    background: "black",
    border: "1px solid #424242",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: "black",
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: "#EEBC1D",
      fontFamily: "Montserrat",
      fontWeight: "bold",
    },
  },
}))(MenuItem);

export default function VertNav() {
  const logout = useLogoutUser();
  const username = useUserDataStore((state) => state.username);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        <ExpandMoreIcon style={{ color: "rgb(238, 188, 29)" }} />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={() => {
            history.push(`/user/${username}`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <Link to="/shop">
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShopIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Shop" />
          </StyledMenuItem>
        </Link>
        <SendCryptoBucksModal handleCloseMenu={handleClose} />
        <StyledMenuItem
          onClick={() => {
            logout();
            handleClose();
            history.push("/");
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
