import { clearTokens, saveTokens } from "@/constants/storage";
import { useDispatch, useSelector } from "react-redux";
import api from "../constants/axiosClient";
import { clearToken, setToken } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((s: RootState) => s.auth.accessToken);
  const isLoading = useSelector((s: RootState) => s.auth.isLoading);
  const isLoggedIn = !!accessToken;

  const login = async (email: string, password: string) => {
    const res = await api.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/Auth/login`,
      { email, password },
    );

    if (res.data.success) {
      const { accessToken, refreshToken } = res.data.data;

      await saveTokens(accessToken, refreshToken);
      dispatch(setToken(accessToken));
    }

    return { res: res.data.success, msg: res.data.message };
  };

  const logOut = async () => {
    await clearTokens();
    dispatch(clearToken());
  };

  return { isLoggedIn, isLoading, login, logOut };
};
