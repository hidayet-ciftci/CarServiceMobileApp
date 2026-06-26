import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { createCustomer } from "@/constants/customerApi";
import { customerDataType } from "@/constants/types";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function NewCustomerScreen() {
  const [newCustomer, setNewCustomer] = useState<customerDataType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    createdTime: new Date().toISOString(),
  });

  const handleAddCustomer = async () => {
    if (newCustomer == undefined || newCustomer == null) return;
    const customerData = await createCustomer(newCustomer);
    if (customerData) {
      if (customerData?.success) {
        Toast.show({ type: "success", text1: customerData?.message });
        router.back();
      } else Toast.show({ type: "error", text1: customerData?.message });
    } else {
      router.back();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <ThemedText>Go Back</ThemedText>
        </TouchableOpacity>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerLabel}>Musteri Modulu</ThemedText>
          <ThemedText style={styles.headerTitle}>Yeni Musteri Ekle</ThemedText>
          <ThemedText style={styles.headerSub}>
            Musteri bilgilerini doldurun, kayit islemi sonradan eklenecek.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.fieldLabel}>Ad</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ornek: Ali Celik"
            placeholderTextColor="#5E8C78"
            value={newCustomer?.firstName}
            onChangeText={(text) =>
              setNewCustomer((prev) => ({
                ...prev,
                firstName: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Soyad</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ornek: Ali Celik"
            placeholderTextColor="#5E8C78"
            value={newCustomer?.lastName}
            onChangeText={(text) =>
              setNewCustomer((prev) => ({
                ...prev,
                lastName: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Telefon</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="05xx xxx xx xx"
            placeholderTextColor="#5E8C78"
            keyboardType="phone-pad"
            value={newCustomer?.phoneNumber ?? ""}
            onChangeText={(text) =>
              setNewCustomer((prev) => ({
                ...prev,
                phoneNumber: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="ornek@mail.com"
            placeholderTextColor="#5E8C78"
            keyboardType="email-address"
            autoCapitalize="none"
            value={newCustomer?.email ?? ""}
            onChangeText={(text) =>
              setNewCustomer((prev) => ({
                ...prev,
                email: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Adres</ThemedText>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Musteri adresini yazin..."
            placeholderTextColor="#5E8C78"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={newCustomer.address ?? ""}
            onChangeText={(text) =>
              setNewCustomer((prev) => ({
                ...prev,
                address: text,
              }))
            }
          />
          <ThemedText style={styles.fieldLabel}>Olusturulma Tarihi</ThemedText>
          <TextInput
            style={styles.input}
            value={new Date(newCustomer?.createdTime ?? "0").toLocaleString(
              "tr-TR",
            )}
            editable={false}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddCustomer}
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
    backgroundColor: "#F4F8F2",
  },
  content: {
    padding: 16,
    gap: 14,
  },
  header: {
    backgroundColor: "#234F3F",
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  headerLabel: {
    color: "#9AD8BE",
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
    color: "#D2EFE2",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#D8EAE1",
  },
  fieldLabel: {
    color: "#1E4434",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C8DDD4",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#FAFCFB",
    color: "#122E24",
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: 10,
  },
  saveButton: {
    marginTop: 6,
    backgroundColor: "#1E6A50",
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
