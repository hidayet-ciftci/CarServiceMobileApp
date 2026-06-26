import { DateInputView } from "@/components/Date-Input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { createServiceRecord } from "@/constants/serviceRecordApi";
import { SCDataType, userDataType } from "@/constants/types";
import { RootState } from "@/store/store";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function NewServiceScreen() {
  const [serviceRecord, setserviceRecord] = useState<SCDataType>({
    id: 0,
    vehicleId: 0,
    userId: 0,
    description: "",
    state: "",
    plannedEndDate: "",
    endDate: null,
    price: 0,
    createdTime: new Date().toISOString(),
  });
  const vehiclesData = useSelector(
    (state: RootState) => state.vehicleStoreData.vehiclesData,
  );
  const userData: userDataType[] = useSelector(
    (state: RootState) => state.userStoreData.userData,
  );

  const handleAddSC = async () => {
    if (serviceRecord == undefined || serviceRecord == null) return;
    const newSC = await createServiceRecord(serviceRecord);
    if (newSC) {
      if (newSC?.success) {
        Toast.show({ type: "success", text1: newSC?.message });
        router.back();
      } else Toast.show({ type: "error", text1: newSC?.message });
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
          <ThemedText style={styles.headerLabel}>Servis Modulu</ThemedText>
          <ThemedText style={styles.headerTitle}>Yeni Servis Kaydi</ThemedText>
          <ThemedText style={styles.headerSub}>
            Servis bilgilerini doldurun, kayit islemi sonradan eklenecek.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.fieldLabel}>Müşteri Aracı</ThemedText>
          {/* <TextInput
            style={styles.input}
            value={
              Number.isNaN(serviceRecord.vehicleId)
                ? "0"
                : serviceRecord.vehicleId.toString()
            }
            onChangeText={(text) =>
              setserviceRecord((prev) => ({
                ...prev,
                vehicleId: parseInt(text),
              }))
            }
          /> */}
          <Dropdown
            style={styles.input}
            data={vehiclesData.map((c) => ({
              ...c,
              label: ` ${c?.brand} ${c?.plate}`,
            }))}
            labelField="label"
            valueField="id"
            placeholder="müşteri aracı seç"
            value={serviceRecord?.vehicleId}
            onChange={(item) => {
              setserviceRecord((prev) => ({
                ...prev,
                vehicleId: item?.id,
              }));
            }}
          />
          <ThemedText style={styles.fieldLabel}>Tamirci</ThemedText>
          {/* <TextInput
            style={styles.input}
            value={
              Number.isNaN(serviceRecord.userId)
                ? "0"
                : serviceRecord.userId.toString()
            }
            onChangeText={(text) =>
              setserviceRecord((prev) => ({
                ...prev,
                userId: parseInt(text),
              }))
            }
          /> */}
          <Dropdown
            style={styles.input}
            data={userData
              .filter((u) => u?.roleName == "Worker")
              .map((c) => ({
                ...c,
                label: `${c?.firstName} ${c?.lastName}`,
              }))}
            labelField="label"
            valueField="id"
            placeholder="tamirci seç"
            value={serviceRecord?.userId ?? 0}
            onChange={(item) => {
              setserviceRecord((prev) => ({
                ...prev,
                userId: item.id,
              }));
            }}
          />
          <ThemedText style={styles.fieldLabel}>Aciklama</ThemedText>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Servis detaylarini yazin..."
            placeholderTextColor="#A090C0"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={serviceRecord.description ?? ""}
            onChangeText={(text) =>
              setserviceRecord((prev) => ({
                ...prev,
                description: text,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Durum</ThemedText>

          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.statusButton,
                serviceRecord.state === "Tamamlandi" && styles.active,
              ]}
              onPress={() =>
                setserviceRecord((prev) => ({
                  ...prev,
                  state: "Tamamlandi",
                }))
              }
            >
              <ThemedText style={styles.statusText}>Tamamlandı</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusButton,
                serviceRecord.state === "Yeni Basladi" && styles.active,
              ]}
              onPress={() =>
                setserviceRecord((prev) => ({
                  ...prev,
                  state: "Yeni Basladi",
                }))
              }
            >
              <ThemedText style={styles.statusText}>Yeni Başladı</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setserviceRecord((prev) => ({
                  ...prev,
                  state: "Devam Ediyor",
                }))
              }
              style={[
                styles.statusButton,
                serviceRecord.state === "Devam Ediyor" && styles.active,
              ]}
            >
              <ThemedText style={styles.statusText}>Devam Ediyor</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.fieldLabel}>Ücret</ThemedText>
          <TextInput
            style={styles.input}
            value={
              Number.isNaN(serviceRecord.price)
                ? "0"
                : (serviceRecord?.price?.toString() ?? "0")
            }
            onChangeText={(text) =>
              setserviceRecord((prev) => ({
                ...prev,
                price: parseInt(text),
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>
            Planlanan Bitiş Tarihi
          </ThemedText>
          {/* <TextInput
            style={styles.input}
            value={serviceRecord.plannedEndDate ?? ""}
            onChangeText={(text) =>
              setserviceRecord((prev) => ({
                ...prev,
                plannedEndDate: text,
              }))
            }
          /> */}
          <DateInputView
            value={
              serviceRecord.plannedEndDate
                ? new Date(serviceRecord.plannedEndDate)
                : undefined
            }
            onChange={(date) =>
              setserviceRecord((prev) => ({
                ...prev,
                plannedEndDate: date ? date.toISOString() : null,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Bitiş Tarihi</ThemedText>
          {/* <TextInput
            style={styles.input}
            value={serviceRecord.endDate ?? ""}
            onChangeText={(text) =>
              setserviceRecord((prev) => ({
                ...prev,
                endDate: text,
              }))
            }
          /> */}
          <DateInputView
            value={
              serviceRecord.endDate
                ? new Date(serviceRecord.endDate)
                : undefined
            }
            onChange={(date) =>
              setserviceRecord((prev) => ({
                ...prev,
                endDate: date ? date.toISOString() : null,
              }))
            }
          />

          <ThemedText style={styles.fieldLabel}>Olusturulma Tarihi</ThemedText>
          <TextInput
            style={styles.input}
            value={new Date(serviceRecord?.createdTime ?? "0").toLocaleString(
              "tr-TR",
            )}
            editable={false}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleAddSC}>
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
    backgroundColor: "#F6F4FB",
  },
  content: {
    padding: 16,
    gap: 14,
  },
  header: {
    backgroundColor: "#3C2C74",
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  headerLabel: {
    color: "#CABEFF",
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
    color: "#E6DFFC",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E4DCF5",
  },
  fieldLabel: {
    color: "#4A3F70",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5C9ED",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#FCFAFF",
    color: "#241E39",
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: 10,
  },
  saveButton: {
    marginTop: 6,
    backgroundColor: "#5841A8",
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
  statusContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },

  statusButton: {
    flex: 1,
    backgroundColor: "#EDE7FF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  statusText: {
    fontWeight: "600",
    color: "#3C2C74",
  },

  active: {
    backgroundColor: "#5841A8",
  },
});
