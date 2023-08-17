import * as React from "react";
import {
  Button,
  Box,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

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
  buyButton: {
    background: "#f50057",
    color: "white",
  },
}));

const stripePromise = loadStripe(
  "pk_test_51N32SdSDHWsRvho3U65ezdy3eJFPTn292eYlFJ6tpKHz6qNlCC3g5iU7t1SWjAScbIvgIrmqedNBnqDQPXqyXzyi00FZp0pOVS"
);

export default function CheckoutModal({ cryptoBucksAmt }) {
  const [clientSecret, setClientSecret] = useState("");
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/crypto/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cryptoBucksAmt: cryptoBucksAmt }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cryptoBucksAmt]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      <Button
        variant="contained"
        startIcon={<ShoppingCartIcon />}
        size="large"
        className={classes.buyButton}
        onClick={handleOpen}
      >
        BUY
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style} style={{ background: "white" }}>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm cryptoBucksAmt={cryptoBucksAmt} />
              </Elements>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
