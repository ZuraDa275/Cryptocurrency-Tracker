import * as React from "react";
import {
  Button,
  Box,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
} from "@material-ui/core";
import BasicTabs from "./Login&Register";

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
const useStyles = makeStyles((theme) => ({
  register: {
    color: "black",
    background: "rgb(238, 188, 29)",
  },
}));

export default function RegisterModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        className={classes.register}
      >
        LOGIN
      </Button>
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
            <BasicTabs />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
