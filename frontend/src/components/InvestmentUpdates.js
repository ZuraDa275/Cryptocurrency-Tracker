import { makeStyles, Paper, Typography } from "@material-ui/core";
import useUserDataStore from "../store/userDataStore";
import { intlFormatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#424242",
    width: theme.spacing(100),
    height: theme.spacing(10),
    color: "white",
    marginBottom: "5ch",
    padding: "1rem",
    marginLeft: "-10em",
  },
  modalHeader: {
    color: "gold",
    fontFamily: "Bruno Ace SC",
    marginBottom: "1.2em",
    textAlign: "right",
  },
}));

function InvestmentUpdates() {
  const classes = useStyles();
  const investmentUpdates = useUserDataStore(
    (state) => state.investmentUpdates
  );

  if (investmentUpdates.length > 0) {
    return (
      <>
        <Typography className={classes.modalHeader} variant="h5">
          Activity
        </Typography>
        {investmentUpdates.map((updates, i) => (
          <Paper className={classes.paper} key={i}>
            {updates?.type === "Purchase" ? (
              <Typography
                style={{
                  fontFamily: "Raleway",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.7em",
                  position: "relative",
                }}
              >
                Bought&nbsp;
                <span
                  style={{
                    fontFamily: "Quicksand",
                    color: "gold",
                  }}
                >
                  {updates?.amount} {updates?.cryptoSymbol}
                </span>
                &nbsp;for&nbsp;
                <span
                  style={{
                    color: "#f50057",
                    fontWeight: "bold",
                    fontFamily: "Quicksand",
                  }}
                >
                  {updates?.purchaseAmt}&nbsp;CryptoBucks
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    opacity: ".6",
                    fontFamily: "Raleway",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  {intlFormatDistance(updates?.madeAt, new Date().getTime())}
                </span>
              </Typography>
            ) : (
              <Typography
                style={{
                  fontFamily: "Raleway",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.7em",
                  position: "relative",
                }}
              >
                Sold&nbsp;
                <span
                  style={{
                    fontFamily: "Quicksand",
                    color: "gold",
                  }}
                >
                  {updates?.amount} {updates?.cryptoSymbol}
                </span>
                &nbsp;for&nbsp;
                <span
                  style={{
                    color: "#f50057",
                    fontWeight: "bold",
                    fontFamily: "Quicksand",
                  }}
                >
                  {updates?.sellingAmt}&nbsp;CryptoBucks
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    opacity: ".6",
                    fontFamily: "Raleway",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  {intlFormatDistance(updates?.madeAt, new Date().getTime())}
                </span>
              </Typography>
            )}
          </Paper>
        ))}
      </>
    );
  } else {
    return (
      <Typography variant="h4" style={{ fontFamily: "Quicksand" }}>
        No investment updates as of yet!
      </Typography>
    );
  }
}

export default InvestmentUpdates;
