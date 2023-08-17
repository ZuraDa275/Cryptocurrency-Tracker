import { useEffect, useCallback } from "react";
import useUserDataStore from "../store/userDataStore";
import { shallow } from "zustand/shallow";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";

const timeDiffCheck = (startTime) => {
  let endTime = new Date().getTime();
  let timeDiff = endTime - startTime;
  timeDiff /= 1000;
  let seconds = Math.round(timeDiff);
  return seconds;
};

export const useTrackedCryptoUpdates = (selectedCrypto) => {
  const { setLoading } = CryptoState();
  const { cryptoUpdates, setCryptoUpdates } = useUserDataStore(
    (state) => ({
      cryptoUpdates: state.cryptoUpdates,
      setCryptoUpdates: state.setCryptoUpdates,
    }),
    shallow
  );
  const getCoinInfo = useCallback(async () => {
    setLoading(1);
    try {
      const response = await axios.get(
        SingleCoin(selectedCrypto?.selectCryptoID)
      );
      setCryptoUpdates({
        specificCryptoName: selectedCrypto?.selectedCryptoName,
        startTimeOfTracking: new Date().getTime(),
        currentCryptoPrice: response?.data?.market_data?.current_price,
        hourlyChangePrice:
          response?.data?.market_data?.price_change_percentage_1h_in_currency,
      });
      setLoading(response?.status);
    } catch (error) {
      setLoading(error?.response?.data?.status);
    }
  }, [
    selectedCrypto?.selectedCryptoName,
    selectedCrypto?.selectCryptoID,
    setCryptoUpdates,
    setLoading,
  ]);
  useEffect(() => {
    if (
      (cryptoUpdates.filter(
        (checkForCrypto) =>
          checkForCrypto?.specificCryptoName ===
          selectedCrypto?.selectedCryptoName
      ).length === 0 ||
        timeDiffCheck(
          cryptoUpdates.filter(
            (checkForCrypto) =>
              checkForCrypto?.specificCryptoName ===
              selectedCrypto?.selectedCryptoName
          )[0]?.startTimeOfTracking
        ) >= 3600) &&
      selectedCrypto
    ) {
      getCoinInfo();
    }
  }, [selectedCrypto, cryptoUpdates, getCoinInfo]);

  return cryptoUpdates;
};
