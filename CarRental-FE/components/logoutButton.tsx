import { useAuth } from "@/hooks/useAuth";
import { Button, View } from "react-native";

export const LogoutButton = () => {
  const { logOut } = useAuth();

  return (
    <View style={{ marginRight: 20, marginTop: 10, width: 55 }}>
      <Button title="Çıkış" onPress={logOut} />
    </View>
  );
};
