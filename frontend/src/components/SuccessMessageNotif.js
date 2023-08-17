import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../CryptoContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SuccessMessageNotif() {
  const { open, setOpen, response, setResponse } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setResponse("");
  };

  return (
    <>
      {response && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", color: "white" }}
          >
            {response}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
