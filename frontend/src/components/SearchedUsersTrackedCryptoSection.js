import { Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import EmptyCryptoList from "../Bitcoin-cuate.png";

const monthObj = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#424242",
    height: theme.spacing(10),
    color: "white",
    padding: "1em",
  },
}));

function SearchedUsersTrackedCryptoSection({ routeTrackedCryptos }) {
  const classes = useStyles();
  let history = useHistory();
  const date = new Date(routeTrackedCryptos[0]?.cryptoTrackedDate);
  let trackedDate =
    date.getDate() +
    " " +
    monthObj[date.getMonth()] +
    ", " +
    date.getFullYear();
  return routeTrackedCryptos?.length > 0 ? (
    <div style={{ display: "flex", padding: "2em", flexWrap: "wrap" }}>
      {routeTrackedCryptos?.map((trackedCryptos) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5ch",
            marginBottom: "2em",
          }}
          key={trackedCryptos?.id}
        >
          <img
            src={trackedCryptos?.cryptoImage}
            alt={trackedCryptos?.cryptoName}
            style={{ maxWidth: "20%", cursor: "pointer" }}
            onClick={() => history.push(`/coins/${trackedCryptos?.cryptoID}`)}
          />

          <Paper className={classes.paper}>
            <Typography variant="h5" style={{ fontFamily: "Quicksand" }}>
              <span style={{ color: "#f50057" }}>
                {trackedCryptos?.cryptoName}
              </span>{" "}
              is being tracked since{" "}
              <span style={{ color: "gold", fontFamily: "Bruno Ace SC" }}>
                {trackedDate}
              </span>
            </Typography>
          </Paper>
        </div>
      ))}
    </div>
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
        <h1>Above user hasn't tracked any cryptos yet.</h1>
        <Link to="/">
          <Button
            variant="outlined"
            size="large"
            style={{
              color: "gold",
              borderColor: "gold",
              fontSize: "1.21rem",
              fontFamily: "Raleway",
            }}
          >
            Checkout Cryptos
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SearchedUsersTrackedCryptoSection;
