import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { userDataType } from "@/constants/types";
import { getIdUser, updateUser } from "@/constants/userApi";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

export default function UserDetailScreen() {
  const [user, setUser] = useState<userDataType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
    phoneNumber: "",
    status: true,
    createdTime: new Date().toISOString(),
  });
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetDetail = async () => {
    const userData = await getIdUser(id);
    if (userData) {
      if (userData?.success) {
        setUser(userData?.data);
        setIsLoading(false);
      } else {
        Toast.show({ type: "error", text1: userData?.message });
      }
    } else {
      router.back();
    }
  };

  const updateUserById = async () => {
    const updatedUserData = await updateUser(user);
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
        <ThemedText style={styles.title}>Kullanici Detayi</ThemedText>

        <ThemedText style={styles.subtitle}>
          Secilen kullanicinin bilgilerinin guncellenebilecegi tasarim ekrani.
        </ThemedText>

        <ThemedText style={styles.label}>Ad</ThemedText>
        <TextInput
          style={styles.input}
          value={user?.firstName ?? ""}
          onChangeText={(text) =>
            setUser((prev) => ({
              ...prev,
              firstName: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Soyad</ThemedText>
        <TextInput
          style={styles.input}
          value={user?.lastName ?? ""}
          onChangeText={(text) =>
            setUser((prev) => ({
              ...prev,
              lastName: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={user?.email ?? ""}
          onChangeText={(text) =>
            setUser((prev) => ({
              ...prev,
              email: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Telefon</ThemedText>
        <TextInput
          style={styles.input}
          value={user?.phoneNumber ?? ""}
          onChangeText={(text) =>
            setUser((prev) => ({
              ...prev,
              phoneNumber: text,
            }))
          }
        />

        <ThemedText style={styles.label}>Durum</ThemedText>

        <TouchableOpacity
          onPress={() =>
            setUser((prev) => ({
              ...prev,
              status: !prev.status,
            }))
          }
        >
          <Text style={styles.input}>{user?.status ? "Aktif" : "Pasif"}</Text>
        </TouchableOpacity>

        <ThemedText style={styles.label}>Olusturulma Tarihi</ThemedText>
        <TextInput
          style={styles.input}
          value={new Date(user?.createdTime).toLocaleString()}
          editable={false}
        />

        <TouchableOpacity style={styles.button} onPress={updateUserById}>
          <ThemedText style={styles.buttonText}>Guncelle</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F3F6FB",
    justifyContent: "center",
    padding: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E7EDF5",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#12243A",
  },

  subtitle: {
    color: "#60758C",
    lineHeight: 20,
    marginBottom: 4,
  },

  label: {
    color: "#294259",
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D6E1EE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FBFDFF",
    color: "#12243A",
  },

  button: {
    marginTop: 8,
    backgroundColor: "#1D608A",
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
