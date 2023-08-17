import { Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import EmptyCryptoList from "../Bitcoin-cuate.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#424242",
    height: theme.spacing(10),
    width: theme.spacing(100),
    color: "white",
    padding: "1rem",
    position: "relative",
  },
  modalHeader: {
    color: "gold",
    fontFamily: "Bruno Ace SC",
    margin: "1em",
  },
}));

function SearchedUsersWallet({ routeCryptoWallet }) {
  const classes = useStyles();
  let history = useHistory();

  return routeCryptoWallet?.length > 0 ? (
    <>
      <Typography className={classes.modalHeader} variant="h4">
        CryptoWallet:{" "}
      </Typography>
      <div
        style={{
          display: "flex",
          padding: "2em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {routeCryptoWallet?.map((cW) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2ch",
              background: "white",
              padding: ".5rem",
              borderRadius: "2vw",
              marginBottom: "1.2em",
              marginRight: "1em",
              width: "30%",
            }}
            key={cW?.id}
          >
            <img
              src={cW?.investedCryptoImage}
              alt={cW?.investedCryptoName}
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/coins/${cW?.investedCryptoID}`)}
            />
            <Typography
              style={{ fontFamily: "Raleway", color: "black" }}
              variant="h4"
            >
              {cW?.investedCryptoName}
            </Typography>
            <h3
              style={{
                marginLeft: "auto",
                marginRight: "1em",
              }}
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
        ))}
      </div>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Montserrat",
        gap: "2ch",
      }}
    >
      <img
        style={{
          width: "30%",
          height: "30%",
        }}
        src={EmptyCryptoList}
        alt="No tracked cryptos"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2ch",
        }}
      >
        <h1>CryptoWallet is empty!</h1>
      </div>
    </div>
  );
}

export default SearchedUsersWallet;
