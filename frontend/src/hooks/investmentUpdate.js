import useUserDataStore from "../store/userDataStore";

export const useInvestmentUpdate = () => {
  const setInvestmentUpdate = useUserDataStore(
    (state) => state.setInvestmentUpdates
  );
  const updateOnInvestment = (newUpdate) => {
    setInvestmentUpdate(newUpdate);
  };
  return updateOnInvestment;
};
