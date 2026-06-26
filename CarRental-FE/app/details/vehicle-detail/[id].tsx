import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { vehicleDataType } from "@/constants/types";
import { getVehicleById, updateVehicles } from "@/constants/vehicleApi";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

export default function VehicleDetailScreen() {
  const [vehicle, setVehicle] = useState<vehicleDataType>({
    id: 0,
    brand: "",
    color: "",
    customerId: 0,
    plate: "",
    viN_Number: "",
    createdTime: "",
  });
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetDetail = async () => {
    const vehicleData = await getVehicleById(id);
    if (vehicleData) {
      if (vehicleData?.success) {
        setVehicle(vehicleData?.data);
        setIsLoading(false);
      } else {
        Toast.show({ type: "success", text1: vehicleData?.message });
      }
    } else {
      router.replace("/(tabs)/users");
    }
  };

  const updateVehicleById = async () => {
    const updatedUserData = await updateVehicles(vehicle);
    if (updatedUserData) {
      if (updatedUserData?.success) {
        Toast.show({ type: "success", text1: updatedUserData?.message });
        router.back();
      } else {
        Toast.show({ type: "error", text1: updatedUserData?.message });
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleGetDetail();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator size={"large"} style={{ flex: 1 }}></ActivityIndicator>
    );
  }
  return (
    <ThemedView style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <ThemedText>Go Back</ThemedText>
      </TouchableOpacity>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>Arac Detayi</ThemedText>
        <ThemedText style={styles.subtitle}>
          Secilen aracin bilgilerini guncellemek icin tasarim alani.
        </ThemedText>

        <ThemedText style={styles.label}>Plaka</ThemedText>
        <TextInput
          style={styles.input}
          value={vehicle?.plate ?? ""}
          onChangeText={(text) =>
            setVehicle((prev) => ({
              ...prev,
              plate: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Model</ThemedText>
        <TextInput
          style={styles.input}
          value={vehicle?.brand ?? ""}
          onChangeText={(text) =>
            setVehicle((prev) => ({
              ...prev,
              brand: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Renk</ThemedText>
        <TextInput
          style={styles.input}
          value={vehicle?.color ?? ""}
          onChangeText={(text) =>
            setVehicle((prev) => ({
              ...prev,
              color: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Şase Numarası</ThemedText>
        <TextInput
          style={styles.input}
          value={vehicle?.viN_Number ?? ""}
          onChangeText={(text) =>
            setVehicle((prev) => ({
              ...prev,
              viN_Number: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Araç Sahibi</ThemedText>
        <TextInput
          style={styles.input}
          value={
            Number.isNaN(vehicle.customerId)
              ? "0"
              : vehicle.customerId.toString()
          }
          onChangeText={(text) =>
            setVehicle((prev) => ({
              ...prev,
              customerId: parseInt(text),
            }))
          }
          editable={false}
        />

        <ThemedText style={styles.label}>Olusturulma Tarihi</ThemedText>
        <TextInput
          style={styles.input}
          value={new Date(vehicle?.createdTime ?? "0").toLocaleString("tr-TR")}
          editable={false}
        />

        <TouchableOpacity style={styles.button} onPress={updateVehicleById}>
          <ThemedText style={styles.buttonText}>Guncelle</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F8F5F2",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8DDD2",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2B2018",
  },
  subtitle: {
    color: "#7A6859",
    lineHeight: 20,
    marginBottom: 4,
  },
  label: {
    color: "#4A3D30",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DCCFBE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFCF8",
    color: "#2B2018",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#8B5A35",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  backButton: {
    borderRadius: 14,
    margin: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    right: 5,
    top: 60,
    position: "absolute",
  },
});
