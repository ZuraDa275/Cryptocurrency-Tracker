import { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { shallow } from "zustand/shallow";
import useUserDataStore from "../store/userDataStore";

export default function SignUpContent() {
  const {
    setUsername,
    setCryptoBucks,
    setTrackedCryptos,
    setFollowing,
    setFollowers,
    setProfileImage,
    setCryptoWallet,
  } = useUserDataStore(
    (state) => ({
      setUsername: state.setUsername,
      setCryptoBucks: state.setCryptoBucks,
      setTrackedCryptos: state.setTrackedCryptos,
      setFollowing: state.setFollowing,
      setFollowers: state.setFollowers,
      setProfileImage: state.setProfileImage,
      setCryptoWallet: state.setCryptoWallet,
    }),
    shallow
  );
  const { setAccessToken, setResponse, setError, setOpen } = CryptoState();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (userCredentials) => {
    try {
      const response = await axios.post("/api/user/register", userCredentials);
      setResponse(response?.data?.msg);
      setAccessToken(response?.headers["x-token"]);
      setUsername(response?.data?.userInfo?.username);
      setCryptoBucks(response?.data?.userInfo?.cryptoBucks);
      setTrackedCryptos(response?.data?.userInfo?.trackedCryptos);
      setFollowing(response?.data?.userInfo?.following);
      setFollowers(response?.data?.userInfo?.followers);
      setProfileImage(response?.data?.userInfo?.profile?.profileImage);
      setCryptoWallet(response?.data?.userInfo?.investments);
      if (response?.status) setOpen(true);
    } catch (error) {
      setError(error?.response?.data?.msg);
      if (error?.response?.status) setOpen(true);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Enter Username"
        variant="outlined"
        style={{ marginBottom: "2em" }}
        onChange={(e) => {
          setUserCredentials({ ...userCredentials, username: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Enter Email"
        variant="outlined"
        style={{ marginBottom: "2em" }}
        onChange={(e) => {
          setUserCredentials({ ...userCredentials, email: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Enter Password"
        variant="outlined"
        type="password"
        style={{ marginBottom: "2em" }}
        onChange={(e) => {
          setUserCredentials({ ...userCredentials, password: e.target.value });
        }}
      />
      <Button
        color="secondary"
        variant="contained"
        style={{ padding: "1em" }}
        onClick={() => handleSubmit(userCredentials)}
      >
        SIGN UP
      </Button>
    </Box>
  );
}
