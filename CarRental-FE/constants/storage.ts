import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  }
};

export const getAccessToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("accessToken");
  } else {
    return await SecureStore.getItemAsync("accessToken");
  }
};

export const getRefreshToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("refreshToken");
  } else {
    return await SecureStore.getItemAsync("refreshToken");
  }
};

export const clearTokens = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } else {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  }
};
