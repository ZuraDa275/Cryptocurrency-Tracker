import * as React from "react";
import { Box, Modal, Backdrop, Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Mutuals from "./Mutuals";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#424242",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

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

export default function SendCryptoBucksModal({ handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <StyledMenuItem
        onClick={() => {
          handleCloseMenu();
          handleOpen();
        }}
      >
        <ListItemIcon>
          <AttachMoneyIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Send CryptoBucks" />
      </StyledMenuItem>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Mutuals handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
