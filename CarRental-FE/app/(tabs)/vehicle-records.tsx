import { deleteButton } from "@/components/Alert-Delete";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  deleteSCById,
  fetchServiceRecords,
} from "@/constants/serviceRecordApi";
import { SCDataType } from "@/constants/types";
import { setSCStoreData } from "@/store/serviceRecord";
import { AppDispatch, RootState } from "@/store/store";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function VehicleRecordsScreen() {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selecteds, setSelecteds] = useState<number[]>([]);
  /*   const [ServiceRecordData, setSCData] = useState<SCDataType[]>(); */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();

  const ServiceRecordData: SCDataType[] = useSelector(
    (state: RootState) => state.ScStoreData.serviceRecordData,
  );

  const vehiclesData = useSelector(
    (state: RootState) => state.vehicleStoreData.vehiclesData,
  );
  const userData = useSelector(
    (state: RootState) => state.userStoreData.userData,
  );

  const handleGetServiceRecords = async () => {
    const ServiceRecordData = await fetchServiceRecords();
    if (ServiceRecordData) {
      if (ServiceRecordData?.success) {
        dispatch(setSCStoreData(ServiceRecordData?.data));
        /*       setSCData(ServiceRecordData.data); */
        setIsLoading(false);
      } else {
        Toast.show({ type: "error", text1: ServiceRecordData?.message });
        setIsLoading(false);
      }
    }
  };

  const handleDeleteSC = async () => {
    const deletedSCData = await deleteSCById(selecteds);
    if (deletedSCData) {
      if (deletedSCData?.success) {
        Toast.show({ type: "success", text1: deletedSCData?.message });
        setSelecteds([]);
        setDeleteMode(false);
        handleGetServiceRecords();
      } else {
        Toast.show({ type: "error", text1: deletedSCData?.message });
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleGetServiceRecords();
  }, [isFocused]);

  if (isLoading) {
    return (
      <ActivityIndicator size={"large"} style={{ flex: 1 }}></ActivityIndicator>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ThemedView style={styles.topCard}>
        <ThemedText style={styles.topLabel}>Arac Kayit Modulu</ThemedText>
        <ThemedText style={styles.topTitle}>Servis Kayitlari</ThemedText>
        <ThemedText style={styles.topDesc}>
          Arac kayitlarini goruntuleme, ekleme ve silme is akisi icin tasarim
          alani.
        </ThemedText>
      </ThemedView>

      <View style={styles.rowActions}>
        <Pressable
          style={styles.primaryAction}
          onPress={() => {
            deleteMode
              ? deleteButton(
                  handleDeleteSC,
                  "Seçilen Servis kayıtlarını silmek, başka kayıtları etkilemez",
                )
              : router.push("/create/new-service");
          }}
        >
          <ThemedText style={styles.primaryActionText}>
            {deleteMode ? "Onayla" : "+ Yeni Servis"}
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.secondaryAction,
            deleteMode && styles.secondaryActionActive,
          ]}
          onPress={() => setDeleteMode((v) => !v)}
        >
          <ThemedText
            style={[
              styles.secondaryActionText,
              deleteMode && styles.secondaryActionTextActive,
            ]}
          >
            {deleteMode ? "Vazgec" : "- Servis Sil"}
          </ThemedText>
        </Pressable>
      </View>
      <View style={styles.statsRow}>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statLabel}>
            Toplam Servis:{" "}
            <ThemedText style={styles.statValue}>
              {ServiceRecordData?.length ?? "0"}
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            Yeni başlayan Servisler:{" "}
            <ThemedText style={styles.statValue}>
              {ServiceRecordData?.filter((a) => a.state == "Yeni Basladi")
                .length ?? "0"}
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            Devam eden Servisler:{" "}
            <ThemedText style={styles.statValue}>
              {ServiceRecordData?.filter((a) => a.state == "Devam Ediyor")
                .length ?? "0"}
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            Tamlananlar Servisler:{" "}
            <ThemedText style={styles.statValue}>
              {ServiceRecordData?.filter((a) => a.state == "Tamamlandi")
                .length ?? "0"}
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </View>
      {ServiceRecordData?.map((SC) => (
        <Pressable
          key={SC.id}
          style={styles.cardLink}
          onPress={() => {
            deleteMode
              ? setSelecteds((prev) =>
                  prev.includes(SC.id)
                    ? prev.filter((i) => i !== SC.id)
                    : [...prev, SC.id],
                )
              : router.push({
                  pathname: "/details/service-detail/[id]",
                  params: { id: SC.id },
                });
          }}
        >
          <ThemedView
            style={[styles.recordCard, deleteMode && styles.recordCardRow]}
          >
            {deleteMode && (
              <ThemedView
                style={
                  selecteds.includes(SC.id)
                    ? styles.selectedCircle
                    : styles.selectCircle
                }
              />
            )}
            <View style={deleteMode ? styles.cardContent : undefined}>
              <View style={styles.recordHeader}>
                <ThemedText style={styles.recordId}>
                  USER:{" "}
                  {userData
                    ?.filter((u) => u?.id == SC?.userId)
                    ?.map((u) => `${u?.firstName} ${u?.lastName}`)}{" "}
                  VEHİCLE:{" "}
                  {vehiclesData
                    ?.filter((v) => v?.id == SC?.vehicleId)
                    ?.map((v) => v?.plate)}
                </ThemedText>
                <ThemedText style={styles.recordDate}>
                  Planlanan Bitiş:{" "}
                  {new Date(SC.plannedEndDate ?? "0").toLocaleDateString()}
                </ThemedText>
              </View>
              <ThemedText style={styles.recordPlate}>
                {SC?.description}
              </ThemedText>
              <ThemedText style={styles.recordNote}>
                Ücret: {SC?.price}
              </ThemedText>
              <ThemedText style={styles.detailText}>
                Detay ve Guncelle
              </ThemedText>
            </View>
          </ThemedView>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F6F4FB",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  topCard: {
    backgroundColor: "#3C2C74",
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  topLabel: {
    color: "#CABEFF",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
    fontSize: 12,
  },
  topTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 23,
  },
  topDesc: {
    color: "#E6DFFC",
    lineHeight: 20,
  },
  rowActions: {
    flexDirection: "row",
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#1F9468",
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryAction: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#EEE8F8",
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7C9EE",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  secondaryActionText: {
    color: "#B04545",
    fontWeight: "700",
  },
  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E4DCF5",
    gap: 4,
  },
  cardLink: {
    borderRadius: 16,
    width: "100%",
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordId: {
    color: "#5A4A8A",
    fontWeight: "700",
  },
  recordDate: {
    color: "#8072A6",
    fontSize: 14,
  },
  recordPlate: {
    fontWeight: "700",
    color: "#241E39",
    fontSize: 16,
  },
  recordNote: {
    color: "#6B6285",
  },
  detailText: {
    marginTop: 4,
    color: "#5D4D9A",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryActionActive: {
    borderColor: "#B04545",
    backgroundColor: "#F9F0F8",
  },
  secondaryActionTextActive: {
    color: "#B04545",
  },
  recordCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#B04545",
    backgroundColor: "#FFFFFF",
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#B04545",
    backgroundColor: "#B04545",
  },
  cardContent: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4DCF5",
    padding: 14,
  },
  statValue: {
    fontWeight: "800",
    color: "#2B2018",
  },
  statLabel: {
    marginTop: 4,
    color: "#5A4A8A",
  },
});
