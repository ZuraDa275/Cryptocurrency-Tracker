import { CryptoState } from "../CryptoContext";
import axios from "axios";
import useUserDataStore from "../store/userDataStore";

export const useLogoutUser = () => {
  const setUsername = useUserDataStore((state) => state.setUsername);
  const setCryptoUpdates = useUserDataStore((state) => state.setCryptoUpdates);
  const { setOpen, setResponse, setError } = CryptoState();
  const logout = async () => {
    try {
      const response = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      setResponse(response.data.msg);
      setUsername(null);
      setCryptoUpdates([]);
      localStorage.clear();
      if (response.status) {
        setOpen(true);
      }
    } catch (error) {
      setError(error?.response?.data?.msg);
      if (error?.response?.status) {
        setOpen(true);
      }
    }
  };
  return logout;
};
