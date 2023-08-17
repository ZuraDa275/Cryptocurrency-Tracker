import React from "react";
import { Grid, Tooltip } from "@material-ui/core";

function TrackedCryptoList({ individualCrypto, setCryptoDisplay, setLoading }) {
  return (
    <Grid item md={3} xs={12} sm={6} key={individualCrypto.id}>
      <Tooltip
        placement="top"
        title={
          <h1 style={{ color: "white", padding: ".5em" }}>
            {individualCrypto.cryptoName}
          </h1>
        }
        arrow
      >
        <img
          src={individualCrypto.cryptoImage}
          alt={individualCrypto.cryptoName}
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => {
            setCryptoDisplay({
              selectedCryptoName: individualCrypto.cryptoName,
              selectCryptoID: individualCrypto.cryptoID,
            });
          }}
        />
      </Tooltip>
    </Grid>
  );
}

export default TrackedCryptoList;
