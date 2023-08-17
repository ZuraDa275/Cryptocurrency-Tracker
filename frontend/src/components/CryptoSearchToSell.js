import { useState } from "react";
import {
  alpha,
  Box,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Chip,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { SingleCoin } from "../config/api";
import useUserDataStore from "../store/userDataStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#424242",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginTop: "1em",
    marginBottom: "2em",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  profileImage: {
    width: "50px",
    height: "50px",
  },
  modalHeader: {
    color: "gold",
    fontFamily: "Bruno Ace SC",
    marginBottom: "1.2em",
  },
}));

export default function CryptoSearchToSell({
  setSelectedCrypto,
  setCryptoCurrentPrice,
}) {
  const cryptoWallet = useUserDataStore((state) => state.cryptoWallet);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const fetchCoinData = async (cryptoID) => {
    const response = await axios.get(SingleCoin(cryptoID));
    setCryptoCurrentPrice(response?.data?.market_data?.current_price);
  };
  return (
    <div>
      <Chip
        icon={<SearchIcon />}
        label="Select from CryptoWallet"
        style={{
          color: "white",
          background: "#f50057",
          fontFamily: "Quicksand",
          width: "30ch",
          marginBottom: "2em",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      />
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
            <Typography className={classes.modalHeader} variant="h5">
              CryptoWallet:{" "}
            </Typography>
            {cryptoWallet.length > 0 ? (
              cryptoWallet.map((cW) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2ch",
                    background: "white",
                    padding: ".5rem",
                    borderRadius: "2vw",
                    cursor: "pointer",
                    marginBottom: "1.2em",
                  }}
                  onClick={() => {
                    fetchCoinData(cW?.investedCryptoID);
                    setSelectedCrypto(
                      cW?.investedCryptoName,
                      cW?.investedCryptoSymbol
                    );
                    handleClose();
                  }}
                  key={cW?.id}
                >
                  <img
                    src={cW?.investedCryptoImage}
                    alt={cW?.investedCryptoName}
                  />
                  <Typography style={{ fontFamily: "Raleway" }} variant="h4">
                    {cW?.investedCryptoName}
                  </Typography>
                  <h3
                    style={{
                      marginLeft: "auto",
                      marginRight: "1em",
                    }}
                    onClick={handleClose}
                  >
                    <span
                      style={{
                        color: "#f50057",
                        fontFamily: "Quicksand",
                      }}
                    >
                      {cW?.amtInWallet} {cW?.investedCryptoSymbol}
                    </span>
                  </h3>
                </div>
              ))
            ) : (
              <Typography
                variant="h6"
                style={{ color: "white", fontFamily: "Quicksand" }}
              >
                The wallet is currently empty!
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
