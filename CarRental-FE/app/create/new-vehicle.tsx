import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { customerDataType, vehicleDataType } from "@/constants/types";
import { createVehicle } from "@/constants/vehicleApi";
import { RootState } from "@/store/store";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function NewVehicleScreen() {
  const [vehicle, setVehicle] = useState<vehicleDataType>({
    id: 0,
    brand: "",
    color: "",
    customerId: 0,
    plate: "",
    viN_Number: "",
    createdTime: new Date().toISOString(),
  });
  const handleAddVehicle = async () => {
    if (vehicle == undefined || vehicle == null) return;
    const vehicleData = await createVehicle(vehicle);
    if (vehicleData) {
      if (vehicleData?.success) {
        Toast.show({ type: "success", text1: vehicleData?.message });
        router.back();
      } else Toast.show({ type: "error", text1: vehicleData?.message });
    } else {
      router.back();
    }
  };
  const customerData: customerDataType[] = useSelector(
    (state: RootState) => state.customerStoreData.customerData,
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <ThemedText>Go Back</ThemedText>
        </TouchableOpacity>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerLabel}>Arac Modulu</ThemedText>
          <ThemedText style={styles.headerTitle}>Yeni Arac Ekle</ThemedText>
          <ThemedText style={styles.headerSub}>
            Araca ait bilgileri doldurun, kayit islemi sonradan eklenecek.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.fieldLabel}>Araç Sahibi</ThemedText>
          {/* <TextInput
            style={styles.input}
            placeholder="Şase Numarası"
            placeholderTextColor="#9E8C7A"
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
          /> */}
          <Dropdown
            style={styles.input}
            data={customerData.map((c) => ({
              ...c,
              label: `${c.firstName} ${c.lastName}`,
            }))}
            labelField="label"
            valueField="id"
            placeholder="müşteri seç"
            value={vehicle?.customerId}
            onChange={(item) => {
              setVehicle((prev) => ({ ...prev, customerId: item.id }));
            }}
          />
          <ThemedText style={styles.fieldLabel}>Plaka</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ornek: 34 ABC 123"
            placeholderTextColor="#9E8C7A"
            value={vehicle?.plate ?? ""}
            onChangeText={(text) =>
              setVehicle((prev) => ({
                ...prev,
                plate: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Marka</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ornek: Renault"
            placeholderTextColor="#9E8C7A"
            value={vehicle?.brand ?? ""}
            onChangeText={(text) =>
              setVehicle((prev) => ({
                ...prev,
                brand: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Color</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ornek: Mavi"
            placeholderTextColor="#9E8C7A"
            value={vehicle?.color ?? ""}
            onChangeText={(text) =>
              setVehicle((prev) => ({
                ...prev,
                color: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Şase Numarası</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Şase Numarası"
            placeholderTextColor="#9E8C7A"
            value={vehicle?.viN_Number ?? ""}
            onChangeText={(text) =>
              setVehicle((prev) => ({
                ...prev,
                viN_Number: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Olusturulma Tarihi</ThemedText>
          <TextInput
            style={styles.input}
            value={new Date(vehicle?.createdTime ?? "0").toLocaleString(
              "tr-TR",
            )}
            editable={false}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddVehicle}
          >
            <ThemedText style={styles.saveButtonText}>Kaydet</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F8F5F2",
  },
  content: {
    padding: 16,
    gap: 14,
  },
  header: {
    backgroundColor: "#3F2D20",
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  headerLabel: {
    color: "#F6CF98",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  headerSub: {
    color: "#F5E2CB",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8DDD2",
  },
  fieldLabel: {
    color: "#4A3D30",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DCCFBE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#FFFCF8",
    color: "#2B2018",
  },
  saveButton: {
    marginTop: 6,
    backgroundColor: "#8B5A35",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  backButton: {
    borderRadius: 14,
    margin: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    right: -275,
    top: 0,
    marginBlock: 0,
    position: "fixed",
  },
});
