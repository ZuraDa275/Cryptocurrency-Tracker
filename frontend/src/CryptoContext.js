import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(0);
  const [symbol, setSymbol] = useState("₹");
  const [accessToken, setAccessToken] = useState();
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [followNotif, setFollowNotif] = useState("");
  const [popOverClosed, setPopOverClosed] = useState(false);
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        popOverClosed,
        setPopOverClosed,
        followNotif,
        setFollowNotif,
        loading,
        setLoading,
        currency,
        setCurrency,
        symbol,
        accessToken,
        setAccessToken,
        response,
        setResponse,
        error,
        setError,
        open,
        setOpen,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
