import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { loginDataType } from "@/constants/types";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

export default function AdminLoginScreen() {
  const [loginData, setLoginData] = useState<loginDataType>({
    email: "admin@admin.com",
    password: "12345678",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const logData: { res: boolean; msg: string } = await login(
        loginData.email,
        loginData.password,
      );
      if (!logData.res) {
        Toast.show({ type: "error", text1: logData.msg });
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <Text style={styles.loginText}>Go Back</Text>
      </TouchableOpacity>
      <ThemedView style={styles.panel}>
        <ThemedText style={styles.panelTitle}>Kullanici Girisi</ThemedText>
        <ThemedText style={styles.panelSub}>
          Email ve password ile yonetim ekranina gecis yapin.
        </ThemedText>

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          value={loginData?.email}
          onChangeText={(text) => {
            setLoginData({ ...loginData, email: text });
          }}
          placeholder="ornek@ornek.com"
          placeholderTextColor="#8EA2B4"
          style={styles.input}
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          value={loginData?.password}
          onChangeText={(text) => {
            setLoginData({ ...loginData, password: text });
          }}
          placeholder="********"
          placeholderTextColor="#8EA2B4"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={isSubmitting}
        >
          <ThemedText style={styles.loginText}>Panele Giris Yap</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#101C2A",
    justifyContent: "center",
    padding: 20,
  },
  panel: {
    backgroundColor: "#F6F9FC",
    borderRadius: 24,
    padding: 20,
    gap: 10,
  },
  panelTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#102336",
  },
  panelSub: {
    color: "#5B738A",
    lineHeight: 20,
    marginBottom: 4,
  },
  label: {
    fontWeight: "700",
    color: "#1B3650",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CFDCE8",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#102336",
    backgroundColor: "#FFFFFF",
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#0B6E4F",
    borderRadius: 14,
    paddingVertical: 13,
    paddingLeft: 15,
    alignItems: "center",
  },
  loginText: {
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
