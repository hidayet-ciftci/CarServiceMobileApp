import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getByIdCustomer, updateCustomer } from "@/constants/customerApi";
import { customerDataType } from "@/constants/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

export default function CustomerAdminDetailScreen() {
  const [customer, setCustomer] = useState<customerDataType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    createdTime: "",
  });
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetDetail = async () => {
    const customerData = await getByIdCustomer(id);
    if (customerData) {
      if (customerData?.success) {
        setCustomer(customerData?.data);
        setIsLoading(false);
      } else {
        Toast.show({ type: "error", text1: customerData?.message });
      }
    } else {
      router.back();
    }
  };

  const updateCustomerById = async () => {
    const updatedCustomerData = await updateCustomer(customer);
    if (updatedCustomerData) {
      if (updatedCustomerData?.success) {
        Toast.show({ type: "success", text1: updatedCustomerData?.message });
        router.back();
      } else {
        Toast.show({ type: "error", text1: updatedCustomerData?.message });
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
        <ThemedText style={styles.title}>Musteri Detayi</ThemedText>
        <ThemedText style={styles.subtitle}>
          Secilen musterinin bilgilerinin guncellenebilecegi tasarim ekrani.
        </ThemedText>

        <ThemedText style={styles.label}>Ad Soyad</ThemedText>
        <TextInput
          style={styles.input}
          value={customer?.firstName ?? ""}
          onChangeText={(text) =>
            setCustomer((prev) => ({
              ...prev,
              firstName: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Soy isim</ThemedText>
        <TextInput
          style={styles.input}
          value={customer?.lastName ?? ""}
          onChangeText={(text) =>
            setCustomer((prev) => ({
              ...prev,
              lastName: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Telefon</ThemedText>
        <TextInput
          style={styles.input}
          value={customer?.phoneNumber ?? ""}
          onChangeText={(text) =>
            setCustomer((prev) => ({
              ...prev,
              phoneNumber: text,
            }))
          }
        />
        <ThemedText style={styles.label}>Adres</ThemedText>
        <TextInput
          style={styles.input}
          value={customer?.address ?? ""}
          onChangeText={(text) =>
            setCustomer((prev) => ({
              ...prev,
              address: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Olusturulma Tarihi</ThemedText>
        <TextInput
          style={styles.input}
          value={new Date(customer?.createdTime ?? "0").toLocaleString("tr-TR")}
          editable={false}
        />

        <TouchableOpacity style={styles.button} onPress={updateCustomerById}>
          <ThemedText style={styles.buttonText}>Guncelle</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F4F8F2",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#DDE8E2",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A3127",
  },
  subtitle: {
    color: "#5D7C6F",
    lineHeight: 20,
    marginBottom: 4,
  },
  label: {
    color: "#2E4C40",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCDDD5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FCFFFD",
    color: "#1A3127",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#2B7A5C",
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
