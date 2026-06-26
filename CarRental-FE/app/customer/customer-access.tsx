import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { getCustomerDetail } from "@/constants/api";
import { AppDispatch } from "@/store/store";
import { setData } from "@/store/uCustomerSlice";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

export default function CustomerAccessScreen() {
  const [email, setEmail] = useState<string>("");
  const disPatch = useDispatch<AppDispatch>();

  async function handleLogin() {
    const loginData = await getCustomerDetail(email);
    if (loginData) {
      if (!loginData?.success)
        Toast.show({ type: "error", text1: loginData?.message });
      if (loginData?.success) {
        disPatch(setData(loginData?.data));
        router.push("/customer/customer-details");
      }
    }
  }

  /*
  DİSPATCH ile veri global olarak set ediliyor.
  - amaç : api'den data.success true gelirse route.push yapıp veriyi çekme
  veya false gelirse uyarı yapmak
  */

  return (
    <ThemedView style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <ThemedText>Go Back</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>Musteri Girisi</ThemedText>
        <ThemedText style={styles.subtitle}>
          Email Adresinizi girerek arac ve servis kayitlarinizi
          goruntuleyebilirsiniz.
        </ThemedText>

        <ThemedText style={styles.label}>Email Adresiniz</ThemedText>
        <TextInput
          placeholder="example@example.com"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#7A8B9C"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <ThemedText style={styles.buttonText}>Detaylari Goruntule</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#EDF5FF",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: "#D6E4F3",
  },
  title: {
    fontSize: 24,
    color: "#132A42",
    fontWeight: "800",
  },
  subtitle: {
    color: "#5A738C",
    lineHeight: 20,
    marginBottom: 6,
  },
  label: {
    fontWeight: "700",
    color: "#213D59",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C9D8E8",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#132A42",
    backgroundColor: "#FAFCFF",
  },
  button: {
    marginTop: 6,
    backgroundColor: "#0B5FA4",
    borderRadius: 14,
    paddingVertical: 13,
    paddingLeft: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
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
