import { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TrackedCryptoList from "./TrackedCryptoList";
import TrackedCryptoUpdates from "./TrackedCryptoUpdates";
import { Link } from "react-router-dom";
import EmptyCryptoList from "../Bitcoin-cuate.png";
import useUserDataStore from "../store/userDataStore";
import SearchedUsersTrackedCryptoSection from "./SearchedUsersTrackedCryptoSection";

function TrackedCryptoSection({ routeTrackedCryptos, routeUsername }) {
  const [cryptoDisplay, setCryptoDisplay] = useState();
  const username = useUserDataStore((state) => state.username);

  if (routeUsername === username) {
    return routeTrackedCryptos.length > 0 ? (
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15ch" }}>
        <Grid
          container
          spacing={5}
          style={{
            width: "30%",
            outline: "2px solid gold",
            borderRadius: "20px",
            padding: "1em",
            marginTop: "2em",
            marginLeft: "5em",
          }}
        >
          {routeTrackedCryptos.map((tc) => (
            <TrackedCryptoList
              individualCrypto={tc}
              setCryptoDisplay={(selectedCrypto) =>
                setCryptoDisplay(selectedCrypto)
              }
            />
          ))}
        </Grid>
        <TrackedCryptoUpdates
          selectedCrypto={cryptoDisplay}
          routeTrackedCryptos={routeTrackedCryptos}
        />
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
          <h1>No cryptos being tracked yet.</h1>
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
  } else {
    return (
      <SearchedUsersTrackedCryptoSection
        routeTrackedCryptos={routeTrackedCryptos}
      />
    );
  }
}

export default TrackedCryptoSection;
