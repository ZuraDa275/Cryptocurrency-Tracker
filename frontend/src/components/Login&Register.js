import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";
import LoginContent from "./LoginContent";
import SignUpContent from "./SignUpContent";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} style={{ color: "white" }}>
      <Box sx={{ borderBottom: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="LOGIN" {...a11yProps(0)} style={{ fontSize: "1.2em" }} />
          <Tab
            label="SIGN UP"
            {...a11yProps(1)}
            style={{ fontSize: "1.2em" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LoginContent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpContent />
      </TabPanel>
    </Box>
  );
}
