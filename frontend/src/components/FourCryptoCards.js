import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

import CheckoutModal from "./CheckoutModal";

export function FourCryptoCards({ items }) {
  return (
    <Container maxWidth="400" style={{ marginTop: "3em" }}>
      {/* Header */}
      <Typography
        variant="h2"
        component="h1"
        style={{
          marginBottom: "1em",
          color: "gold",
          fontFamily: "Bruno Ace SC",
        }}
        align="center"
      >
        CryptoBucks Shop
      </Typography>

      {/* Main content */}
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card>
              <CardMedia component="img" image={item.image} alt={item.name} />
              <CardContent style={{ background: "#424242", color: "white" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ display: "flex", fontFamily: "Montserrat" }}
                >
                  {item.name} CryptoBucks
                  <span style={{ marginLeft: "auto" }}>
                    <CheckoutModal cryptoBucksAmt={item.name} />
                  </span>
                </Typography>
                <Typography
                  style={{
                    color: "#EEBC1D",
                    fontFamily: "Merriweather Sans",
                  }}
                >
                  Price: ₹ {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
