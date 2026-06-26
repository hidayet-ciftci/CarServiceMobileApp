import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Provider, useDispatch, useSelector } from "react-redux";

import DateProvider from "@/components/DatePaper";
import axiosClient from "@/constants/axiosClient";
import { getAccessToken } from "@/constants/storage";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setLoading, setToken } from "@/store/authSlice";
import { AppDispatch, RootState, store } from "@/store/store";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <DateProvider>
          <AppContent />
          <StatusBar style="auto" />
          <Toast />
        </DateProvider>
      </ThemeProvider>
    </Provider>
  );
}

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((s: RootState) => !!s.auth.accessToken);
  const isLoading = useSelector((s: RootState) => s.auth.isLoading);

  // ADIM 1: uygulama açılınca bir kere çalışır
  useEffect(() => {
    const checkToken = async () => {
      const token = await getAccessToken(); // storage.ts'e soruyor
      // token 'i refresh token ile kontrol et.
      if (token) {
        dispatch(setToken(token));
        try {
          const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Users/Me`;
          const res = await axiosClient.get(url);
        } catch (err) {
          dispatch(setLoading(false));
        }
        // token var → Redux'a yaz
      } else {
        dispatch(setLoading(false)); // token yok → kontrol bitti
      }
    };
    checkToken();
  }, []);

  // ADIM 2: isLoggedIn veya isLoading değişince çalışır
  useEffect(() => {
    if (isLoading) return; // kontrol henüz bitmedi, bekle

    if (isLoggedIn) {
      router.replace("/(tabs)/users"); // token var → ana ekran
    } else {
      router.replace("/"); // token yok → login
    }
  }, [isLoggedIn, isLoading]);

  // loading ekranı koy
  if (isLoading) {
    return (
      <ActivityIndicator size={"large"} style={{ flex: 1 }}></ActivityIndicator>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="user-login" />
      <Stack.Screen name="customer/customer-access" />
      <Stack.Screen name="customer/customer-details" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="details/user-detail/[id]" />
      <Stack.Screen name="details/customer-detail/[id]" />
      <Stack.Screen name="details/vehicle-detail/[id]" />
      <Stack.Screen name="details/service-detail/[id]" />

      <Stack.Screen name="create/new-vehicle" />
      <Stack.Screen name="create/new-service" />
      <Stack.Screen name="create/new-user" />
      <Stack.Screen name="create/new-customer" />

      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}
