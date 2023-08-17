import { useEffect } from "react";
import { create } from "axios";
import { CryptoState } from "../CryptoContext";
import useRefreshToken from "./refreshToken";

export const axiosAuthInstance = create({
  withCredentials: true,
});

export const useAxiosAuthInstance = () => {
  const { accessToken, setAccessToken } = CryptoState();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = axiosAuthInstance.interceptors.request.use(
      function (request) {
        request.headers["x-token"] = accessToken;
        return request;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = axiosAuthInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest.sent) {
          originalRequest.sent = true;
          try {
            const newAccessToken = await refreshToken();
            setAccessToken(newAccessToken);
            originalRequest.headers["x-token"] = newAccessToken;
            return axiosAuthInstance(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        if (error?.response?.status === (500 || 501 || 502 || 503))
          return Promise.reject(
            "Something went wrong, please try again later!"
          );
        return Promise.reject(error);
      }
    );
    return () => {
      axiosAuthInstance.interceptors.request.eject(requestInterceptor);
      axiosAuthInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, setAccessToken, refreshToken]);

  return axiosAuthInstance;
};
