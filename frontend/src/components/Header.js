import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import RegisterModal from "./Modal";
import { SuccessMessageNotif } from "./SuccessMessageNotif";
import { ErrorMessageNotif } from "./ErrorMessageNotif";
import useUserDataStore from "../store/userDataStore";
import CryptoBucksAvatar from "./CryptoBucksAvatar";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgb(238, 188, 29)",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();
  const history = useHistory();
  const username = useUserDataStore((state) => state.username);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Crypto Tracker
            </Typography>
            <SuccessMessageNotif />
            <ErrorMessageNotif />
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
              }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {username ? <CryptoBucksAvatar /> : <RegisterModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
