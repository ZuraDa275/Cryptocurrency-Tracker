import { useState } from "react";
import {
  alpha,
  InputBase,
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "200px",
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
}));

export default function CryptoSearchToBuy({ setSelectedCrypto }) {
  const [searchedCrypto, setSearchedCrypto] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchedCrypto("");
  };

  const handleCryptoSearch = async (search) => {
    if (search) {
      try {
        const response = await axios.get(SingleCoin(search));
        setSearchedCrypto({
          name: response?.data?.name,
          image: response?.data?.image?.small,
          change: response?.data?.market_data?.price_change_percentage_24h,
          symbol: response?.data?.symbol,
          price: response?.data?.market_data?.current_price,
          cryptoID: response?.data?.id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchedCrypto("");
    }
  };
  return (
    <div>
      <Chip
        icon={<SearchIcon />}
        label="Search Crypto"
        style={{
          color: "white",
          background: "#f50057",
          fontFamily: "Quicksand",
          width: "20ch",
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Cryptos..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "quicksand",
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  handleCryptoSearch(e.target.value?.toLowerCase());
                }}
              />
            </div>
            {searchedCrypto && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2ch",
                  background: "white",
                  padding: ".5rem",
                  borderRadius: "2vw",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedCrypto(
                    searchedCrypto?.image,
                    searchedCrypto?.name,
                    searchedCrypto?.symbol,
                    searchedCrypto?.cryptoID,
                    searchedCrypto?.price?.inr
                  );
                  handleClose();
                }}
              >
                <img src={searchedCrypto?.image} alt={searchedCrypto?.name} />
                <Typography style={{ fontFamily: "Raleway" }} variant="h4">
                  {searchedCrypto?.name}
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
                      color: searchedCrypto?.change > 0 ? "green" : "red",
                      fontFamily: "Quicksand",
                    }}
                  >
                    {searchedCrypto?.change > 0 && "+"}
                    {searchedCrypto?.change?.toFixed(3)} %
                  </span>
                </h3>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
