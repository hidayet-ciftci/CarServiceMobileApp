import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { HapticTab } from "@/components/haptic-tab";
import { LogoutButton } from "@/components/logoutButton";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { fetchCustomersThunk } from "@/store/customerSlice";
import { AppDispatch } from "@/store/store";
import { fetchUsersThunk } from "@/store/userSlice";
import { fetchVehiclesThunk } from "@/store/vehicleSlice";
import { useDispatch } from "react-redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchVehiclesThunk());
    dispatch(fetchUsersThunk());
    dispatch(fetchCustomersThunk());
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: true,
        headerTitleAlign: "center",
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        headerRight: () => <LogoutButton />,
      }}
    >
      <Tabs.Screen
        name="users"
        options={{
          title: "Yönetim",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.3.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicle"
        options={{
          title: "Arac",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="car.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicle-records"
        options={{
          title: "Servis",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="doc.text.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: "Musteri",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
