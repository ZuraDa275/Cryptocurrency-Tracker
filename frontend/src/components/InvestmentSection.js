import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";
import BuyCrypto from "./BuyCrypto";
import SellCrypto from "./SellCrypto";
import CryptoWallet from "./CryptoWallet";
import InvestmentUpdates from "./InvestmentUpdates";
import useUserDataStore from "../store/userDataStore";
import SearchedUsersWallet from "./SearchUsersWallet";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ routeUsername, routeCryptoWallet }) {
  const [value, setValue] = React.useState(0);
  const username = useUserDataStore((state) => state.username);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (username === routeUsername) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <Box
          sx={{ width: "50%" }}
          style={{ color: "white", alignSelf: "flex-start" }}
        >
          <Box sx={{ borderBottom: 1, marginLeft: "2em" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="BUY"
                {...a11yProps(0)}
                style={{ fontSize: "1.2em" }}
              />
              <Tab
                label="SELL"
                {...a11yProps(1)}
                style={{ fontSize: "1.2em" }}
              />
              <Tab
                label="WALLET"
                {...a11yProps(2)}
                style={{ fontSize: "1.2em" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <BuyCrypto />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SellCrypto />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CryptoWallet />
          </TabPanel>
        </Box>
        <div style={{ alignSelf: "flex-start" }}>
          <InvestmentUpdates />
        </div>
      </div>
    );
  } else {
    return <SearchedUsersWallet routeCryptoWallet={routeCryptoWallet} />;
  }
}
