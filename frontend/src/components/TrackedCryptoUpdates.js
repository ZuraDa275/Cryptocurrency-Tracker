import {
  makeStyles,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { useTrackedCryptoUpdates } from "../hooks/trackedCryptoUpdates";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./CoinsTable";
import { intlFormatDistance } from "date-fns";
import Skeleton from "@material-ui/lab/Skeleton";
import TouchAppIcon from "@material-ui/icons/TouchApp";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#424242",
    width: theme.spacing(120),
    height: theme.spacing(10),
    color: "white",
    marginBottom: "5ch",
    padding: "1rem",
  },
}));

export default function TrackedCryptoUpdates({ selectedCrypto }) {
  const classes = useStyles();
  const { currency, symbol, loading } = CryptoState();
  const cryptoUpdates = useTrackedCryptoUpdates(selectedCrypto);
  return selectedCrypto ? (
    cryptoUpdates?.length > 0 ? (
      <div style={{ marginTop: "2em" }}>
        <Typography
          component="h2"
          variant="h2"
          style={{
            marginBottom: ".5em",
            color: "gold",
            fontFamily: "Bruno Ace SC",
          }}
        >
          {selectedCrypto?.selectedCryptoName}:
        </Typography>
        {loading === 1 && (
          <Skeleton
            style={{
              height: "120px",
              width: "960px",
              background: "#424242",
            }}
          />
        )}
        {cryptoUpdates
          ?.filter(
            (checkForCrypto) =>
              checkForCrypto?.specificCryptoName ===
              selectedCrypto?.selectedCryptoName
          )
          ?.map((updates, key) => {
            const profit =
              updates?.hourlyChangePrice[currency?.toLowerCase()] > 0;
            return (
              <Paper className={classes.paper} key={key}>
                <Typography
                  style={{
                    fontFamily: "Raleway",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "2em",
                  }}
                >
                  Current price:&nbsp;
                  <span style={{ color: "gold", fontFamily: "Quicksand" }}>
                    {symbol}
                    {numberWithCommas(
                      updates?.currentCryptoPrice[
                        currency?.toLowerCase()
                      ].toFixed(2)
                    )}
                  </span>
                  &nbsp;
                  {profit ? "went up by" : "went down by"}
                  &nbsp;
                  <span
                    style={{
                      color: profit ? "green" : "red",
                      fontFamily: "Quicksand",
                    }}
                  >
                    {profit && "+"}
                    {updates?.hourlyChangePrice[
                      currency?.toLowerCase()
                    ].toFixed(3)}
                    %
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      opacity: ".6",
                      fontFamily: "Raleway",
                      marginLeft: "auto",
                    }}
                  >
                    {intlFormatDistance(
                      updates?.startTimeOfTracking,
                      new Date().getTime()
                    )}
                  </span>
                </Typography>
              </Paper>
            );
          })}
      </div>
    ) : (
      <Box
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <CircularProgress
          style={{
            color: "gold",
            scale: "3",
          }}
        />
      </Box>
    )
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5ch",
        alignSelf: "center",
        marginLeft: "2em",
      }}
    >
      <h1 style={{ fontFamily: "Montserrat" }}>
        Click on any of the icons to view the crypto updates
      </h1>
      <TouchAppIcon fontSize="large" style={{ color: "gold", scale: "3" }} />
    </div>
  );
}
