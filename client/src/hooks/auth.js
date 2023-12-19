import useSWR from "swr";
import http from "utils/http";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, redirect } = {}) => {
  let navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/user",
    () =>
      http
        .get("/user")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const csrf = () => http.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();
    setErrors([]);
    http
      .post("/auth/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    http
      .post("/auth/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    if (!error) {
      await http.post("/auth/logout");
      mutate();
    }
    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirect && user) navigate(redirect);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    logout,
  };
};
