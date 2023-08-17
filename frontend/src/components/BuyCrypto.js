import { TextField, makeStyles, Button, Typography } from "@material-ui/core";
import CryptoSearchToBuy from "./CryptoSearchToBuy";
import { useState } from "react";
import { numberWithCommas } from "./CoinsTable";
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

function BuyCrypto() {
  const updateOnInvestment = useInvestmentUpdate();
  const [cryptoBucksToDeduct, setCryptoBucksToDeduct] = useState();
  const { setResponse, setOpen, setError } = CryptoState();
  const setCryptoWallet = useUserDataStore((state) => state.setCryptoWallet);
  const setCryptoBucks = useUserDataStore((state) => state.setCryptoBucks);
  const axiosInstance = useAxiosAuthInstance();
  const classes = useStyles();
  const [selectedCrypto, setSelectedCrypto] = useState();
  const [amtToReceive, setAmtToReceive] = useState();
  const handleConversion = (amtToSpent, cryptoPrice) => {
    setCryptoBucksToDeduct(amtToSpent);
    const convertToRupees = amtToSpent * 1.332;
    setAmtToReceive(convertToRupees / cryptoPrice);
  };

  const handleAddInvestments = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/crypto/add-invested-cryptos",
        {
          investedCryptoName: selectedCrypto?.name,
          amtInWallet: amtToReceive?.toFixed(6),
          investedCryptoImage: selectedCrypto?.image,
          changeInCryptoBucks: cryptoBucksToDeduct,
          investedCryptoSymbol: selectedCrypto?.symbol?.toUpperCase(),
          investedCryptoID: selectedCrypto?.cryptoID,
        }
      );
      setCryptoWallet(response?.data?.investedCryptos);
      setCryptoBucks(response?.data?.cryptoBucks);
      setResponse(response?.data?.msg);
      updateOnInvestment({
        type: "Purchase",
        amount: amtToReceive?.toFixed(6),
        cryptoSymbol: selectedCrypto?.symbol?.toUpperCase(),
        purchaseAmt: cryptoBucksToDeduct,
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
        <CryptoSearchToBuy
          setSelectedCrypto={(image, name, symbol, cryptoID, price) =>
            setSelectedCrypto({ image, name, symbol, cryptoID, price })
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
        label="Please enter the amount of CryptoBucks to spend"
        variant="outlined"
        type="Number"
        style={{
          marginBottom: "2em",
        }}
        onChange={(e) =>
          handleConversion(e.target.value, selectedCrypto?.price)
        }
        className={classes.textFields}
      />
      {amtToReceive > 0 && (
        <Typography
          variant="h6"
          style={{
            marginBottom: "1em",
            color: "grey",
            fontFamily: "Quicksand",
          }}
        >
          You will receive: {amtToReceive}{" "}
          {selectedCrypto?.symbol?.toUpperCase()}
        </Typography>
      )}
      {selectedCrypto && (
        <Typography
          variant="h6"
          style={{
            marginBottom: "1.2em",
            color: "grey",
            fontFamily: "Quicksand",
          }}
        >
          Estimation price: 1 {selectedCrypto?.symbol?.toUpperCase()} = ₹
          {numberWithCommas(selectedCrypto?.price.toFixed(2))}
        </Typography>
      )}
      <Button
        className={classes.buyButton}
        variant="contained"
        onClick={handleAddInvestments}
      >
        Purchase
      </Button>
    </div>
  );
}

export default BuyCrypto;
