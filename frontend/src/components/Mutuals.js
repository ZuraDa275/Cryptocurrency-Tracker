import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  makeStyles,
  useTheme,
  TextField,
  Button,
} from "@material-ui/core";
import useUserDataStore from "../store/userDataStore";
import { useState } from "react";
import { useAxiosAuthInstance } from "../hooks/axiosAuthInstance";
import { CryptoState } from "../CryptoContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      background: "#424242",
      color: "white",
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  select: {
    "& .MuiSvgIcon-root, & .MuiSelect-icon,": {
      color: "gold",
    },
  },
  button: {
    color: "white",
    background: "#f50057",
    fontFamily: "Montserrat",
    padding: "1rem",
    width: "100%",
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Mutuals({ handleClose }) {
  const { setResponse, setOpen, setError } = CryptoState();
  const axiosInstance = useAxiosAuthInstance();
  const [personName, setPersonName] = useState("");
  const [amtToSend, setAmtToSend] = useState();
  const following = useUserDataStore((state) => state.following);
  const followers = useUserDataStore((state) => state.followers);
  const setCryptoBucks = useUserDataStore((state) => state.setCryptoBucks);
  const theme = useTheme();
  const classes = useStyles();
  let mutuals = following?.filter((fwing) =>
    followers?.find((fwer) => fwer?.username === fwing?.username)
  );

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleSendCrypto = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/crypto/send-crypto-bucks",
        {
          mutualToSendCrypto: personName,
          amtToSend: parseInt(amtToSend),
        }
      );

      setCryptoBucks(response?.data?.cryptoBucks);
      setResponse(response?.data?.msg);
      if (response?.status) setOpen(true);
    } catch (error) {
      setError(error?.response?.data?.msg);
      if (error?.response?.status) setOpen(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2ch",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel
          style={{ color: "gold", fontFamily: "Quicksand", fontSize: "1.5rem" }}
          id="demo-mutiple-name-label"
        >
          Mutuals
        </InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          style={{
            color: "white",
            fontSize: "2rem",
            fontFamily: "Raleway",
            minWidth: "300px",
          }}
          className={classes.select}
        >
          {mutuals &&
            mutuals?.map((mut) => (
              <MenuItem
                key={mut?.id}
                style={getStyles(mut?.followingUserName, personName, theme)}
                value={mut?.followingUserName}
              >
                {mut?.followingUserName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="CryptoBucks Amount"
        variant="outlined"
        type="Number"
        style={{ marginBottom: "1em", width: "100%" }}
        onChange={(e) => setAmtToSend(e?.target?.value)}
      />
      <Button
        onClick={() => {
          handleSendCrypto();
          handleClose();
        }}
        className={classes.button}
      >
        Send CryptoBucks
      </Button>
    </div>
  );
}

export default Mutuals;
