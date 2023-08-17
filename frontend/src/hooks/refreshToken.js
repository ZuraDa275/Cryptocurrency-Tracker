import { CryptoState } from "../CryptoContext";
import axios from "axios";
import useUserDataStore from "../store/userDataStore";
import { useLogoutUser } from "./logout";

const useRefreshToken = () => {
  const logout = useLogoutUser();
  const setUsername = useUserDataStore((state) => state.setUsername);
  const setCryptoUpdates = useUserDataStore((state) => state.setCryptoUpdates);
  const { setAccessToken } = CryptoState();
  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAccessToken(response.data.newAccessToken);
      return response.data.newAccessToken;
    } catch (error) {
      if (error?.response?.status === 401) {
        await logout();
        return Promise.reject(error);
      }
    }
  };
  return refresh;
};
export default useRefreshToken;
