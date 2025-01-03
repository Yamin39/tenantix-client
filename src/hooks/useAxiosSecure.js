import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://tenantix-server.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        logOut()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/login", { state: pathname });
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
