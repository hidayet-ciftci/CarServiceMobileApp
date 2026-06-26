import { Alert, Platform } from "react-native";

export const deleteButton = (deleteFunc: () => void, msg: string) => {
  if (Platform.OS == "web") {
    confirm("emin misin? " + msg) ? deleteFunc() : alert("iptal edildi");
  } else {
    Alert.alert("Silme Onayı", msg, [
      {
        text: "İptal",
        style: "cancel",
      },
      {
        text: "Sil",
        style: "destructive",
        onPress: deleteFunc,
      },
    ]);
  }
};
