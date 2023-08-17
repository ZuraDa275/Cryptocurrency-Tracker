import { Typography, makeStyles } from "@material-ui/core";
import useUserDataStore from "../store/userDataStore";

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    color: "gold",
    fontFamily: "Bruno Ace SC",
    marginBottom: "1.2em",
  },
}));

function CryptoWallet() {
  const classes = useStyles();
  const cryptoWallet = useUserDataStore((state) => state.cryptoWallet);
  return (
    <div style={{ width: "50%" }}>
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
              marginBottom: "1.2em",
            }}
            key={cW?.id}
          >
            <img src={cW?.investedCryptoImage} alt={cW?.investedCryptoName} />
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
        ))
      ) : (
        <Typography
          variant="h6"
          style={{ color: "white", fontFamily: "Quicksand" }}
        >
          The wallet is currently empty!
        </Typography>
      )}
    </div>
  );
}

export default CryptoWallet;
