import { TextField, makeStyles, Button, Typography } from "@material-ui/core";
import CryptoSearchToSell from "./CryptoSearchToSell";
import { useState } from "react";
import { useAxiosAuthInstance } from "../hooks/axiosAuthInstance";
import useUserDataStore from "../store/userDataStore";
import { CryptoState } from "../CryptoContext";
import { useInvestmentUpdate } from "../hooks/investmentUpdate";

const useStyles = makeStyles({
  textFields: {
    "& .MuiFormLabel-root,  & .MuiInputLabel-root, & .MuiInputLabel-formControl, & .MuiInputLabel-animated, & .MuiInputLabel-outlined":
      {
        color: "grey",
        fontFamily: "Quicksand",
      },
    "& .MuiInputBase-root, & .MuiOutlinedInput-root, & .MuiInputBase-formControl":
      {
        color: "white",
        fontFamily: "Quicksand",
      },
    "& .PrivateNotchedOutline-root-30, & .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    width: "60%",
  },
  buyButton: {
    width: "60%",
    background: "#f50057",
    color: "white",
    fontSize: "2ch",
  },
});

function SellCrypto() {
  const updateOnInvestment = useInvestmentUpdate();
  const [cryptoAmtToDeduct, setCryptoAmtToDeduct] = useState();
  const { setResponse, setOpen, setError } = CryptoState();
  const setCryptoWallet = useUserDataStore((state) => state.setCryptoWallet);
  const setCryptoBucks = useUserDataStore((state) => state.setCryptoBucks);
  const axiosInstance = useAxiosAuthInstance();
  const classes = useStyles();
  const [selectedCrypto, setSelectedCrypto] = useState();
  const [amtToReceive, setAmtToReceive] = useState();
  const [cryptoCurrentPrice, setCryptoCurrentPrice] = useState();

  const handleConversion = (amtToSpent, cryptoPrice) => {
    setCryptoAmtToDeduct(amtToSpent);
    const convertToRupees = amtToSpent * cryptoPrice;
    setAmtToReceive(convertToRupees / 1.332);
  };

  const handleSellInvestments = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/crypto/sell-invested-cryptos",
        {
          investedCryptoName: selectedCrypto?.name,
          changeInWalletAmt: cryptoAmtToDeduct,
          cryptoBucksToBeAdded: Math.ceil(amtToReceive),
        }
      );
      setCryptoWallet(response?.data?.investedCryptos);
      setCryptoBucks(response?.data?.cryptoBucks);
      setResponse(response?.data?.msg);
      updateOnInvestment({
        type: "Sold",
        amount: cryptoAmtToDeduct,
        cryptoSymbol: selectedCrypto?.symbol?.toUpperCase(),
        sellingAmt: Math.ceil(amtToReceive),
        madeAt: new Date().getTime(),
      });
      if (response?.status) setOpen(true);
    } catch (error) {
      setError(error?.response?.data?.msg);
      if (error?.response?.status) setOpen(true);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2ch" }}>
        <CryptoSearchToSell
          setSelectedCrypto={(name, symbol) =>
            setSelectedCrypto({ name, symbol })
          }
          setCryptoCurrentPrice={(currentPrice) =>
            setCryptoCurrentPrice(currentPrice)
          }
        />
        {selectedCrypto && (
          <h2
            style={{
              color: "gold",
              fontFamily: "Bruno Ace SC",
              marginBottom: "1.2ch",
            }}
          >
            {selectedCrypto?.name}
          </h2>
        )}
      </div>
      <TextField
        id="outlined-basic"
        label="Please enter the amount of cryptocurrency to sell"
        variant="outlined"
        type="Number"
        style={{
          marginBottom: "2em",
        }}
        onChange={(e) =>
          handleConversion(
            e.target.value,
            // cryptoCurrentPrice["inr"] ? cryptoCurrentPrice["inr"] : ""
            cryptoCurrentPrice?.inr
          )
        }
        className={classes.textFields}
      />
      {/* <TextField
        id="outlined-basic"
        label="Receive"
        variant="outlined"
        type="Number"
        style={{ marginBottom: "2em" }}
        className={classes.textFields}
      /> */}
      {amtToReceive > 0 && (
        <Typography
          variant="h6"
          style={{
            marginBottom: "1em",
            color: "grey",
            fontFamily: "Quicksand",
          }}
        >
          You will receive: {Math.ceil(amtToReceive)} CryptoBucks
        </Typography>
      )}

      <Button
        className={classes.buyButton}
        variant="contained"
        onClick={handleSellInvestments}
      >
        Sell
      </Button>
    </div>
  );
}

export default SellCrypto;
