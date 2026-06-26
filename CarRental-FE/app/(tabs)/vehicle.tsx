import { deleteButton } from "@/components/Alert-Delete";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { deleteVehiclesByIds } from "@/constants/vehicleApi";
import { AppDispatch, RootState } from "@/store/store";
import { fetchVehiclesThunk } from "@/store/vehicleSlice";
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

export default function VehiclesScreen() {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selecteds, setSelecteds] = useState<number[]>([]);
  /*   const [vehiclesData, setVehiclesData] = useState<vehicleDataType[]>(); */
  /* const [isLoading, setIsLoading] = useState<boolean>(false); */
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  const { vehiclesData, loading, error } = useSelector(
    (state: RootState) => state.vehicleStoreData,
  );

  /*   const handleGetVehicles = async () => {
    const vehicleDatas = await fetchVehicles();
    if (vehicleDatas?.success) {
            setVehiclesData(vehicleDatas.data);
      
      dispatch(setVehicleStoreData(vehicleDatas.data));
    } else {
      Toast.show({ type: "error", text1: vehicleDatas?.message });
    }
  }; */

  const handleDeleteVehicle = async () => {
    const deletedVehiclesData = await deleteVehiclesByIds(selecteds);
    if (deletedVehiclesData) {
      if (deletedVehiclesData?.success) {
        Toast.show({ type: "success", text1: deletedVehiclesData?.message });
        setSelecteds([]);
        setDeleteMode(false);
        /* handleGetVehicles(); */
        dispatch(fetchVehiclesThunk());
      } else {
        Toast.show({ type: "error", text1: deletedVehiclesData?.message });
      }
    }
  };

  useEffect(() => {
    /* 
    setIsLoading(true);
    handleGetVehicles(); */
    dispatch(fetchVehiclesThunk());
  }, [isFocused]);

  useEffect(() => {
    if (error) {
      Toast.show({ type: "error", text1: error });
    }
  }, [error]);

  if (loading) {
    return (
      <ActivityIndicator size={"large"} style={{ flex: 1 }}></ActivityIndicator>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ThemedView style={styles.hero}>
        <ThemedText style={styles.heroSmall}>Arac Modulu</ThemedText>
        <ThemedText style={styles.heroTitle}>Filo Durumu</ThemedText>
        <ThemedText style={styles.heroSub}>
          Arac goruntuleme, ekleme ve cikarma alanlarinin taslak ekrani.
        </ThemedText>
      </ThemedView>
      <View style={styles.controls}>
        <Pressable
          style={styles.primaryAction}
          onPress={() => {
            deleteMode
              ? deleteButton(
                  handleDeleteVehicle,
                  "Seçilen araçları silmek , Servis kayıtlarının silinmesi sağlar",
                )
              : router.push("/create/new-vehicle");
          }}
        >
          <ThemedText style={styles.primaryActionText}>
            {deleteMode ? "Onayla" : "+ Yeni Arac"}
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
            {deleteMode ? "Vazgec" : "- Arac Sil"}
          </ThemedText>
        </Pressable>
      </View>
      <View style={styles.statsRow}>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statLabel}>
            Toplam Arac:{" "}
            <ThemedText style={styles.statValue}>
              {vehiclesData?.length ?? "0"}
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </View>
      {vehiclesData?.map((vehicle, index) => (
        <Pressable
          key={vehicle.id}
          style={styles.cardLink}
          onPress={() => {
            deleteMode
              ? setSelecteds((prev) =>
                  prev.includes(vehicle.id)
                    ? prev.filter((i) => i !== vehicle.id)
                    : [...prev, vehicle.id],
                )
              : router.push({
                  pathname: "/details/vehicle-detail/[id]",
                  params: { id: vehicle.id },
                });
          }}
        >
          <View
            style={[styles.vehicleCard, deleteMode && styles.vehicleCardRow]}
          >
            {deleteMode && (
              <ThemedView
                style={
                  selecteds.includes(vehicle.id)
                    ? styles.selectedCircle
                    : styles.selectCircle
                }
              />
            )}
            <View style={deleteMode ? styles.cardContent : undefined}>
              <ThemedText style={styles.plate}>{vehicle?.brand}</ThemedText>
              <ThemedText style={styles.model}>{vehicle?.color}</ThemedText>
              <ThemedText style={styles.km}>{vehicle?.plate}</ThemedText>
              <ThemedText style={styles.detailText}>
                Detay ve Guncelle
              </ThemedText>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F8F5F2",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  hero: {
    backgroundColor: "#3F2D20",
    borderRadius: 22,
    padding: 20,
    gap: 5,
  },
  heroSmall: {
    color: "#F6CF98",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: "700",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  heroSub: {
    color: "#F5E2CB",
    lineHeight: 20,
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
    borderColor: "#E8DDD2",
    padding: 14,
  },
  statValue: {
    fontWeight: "800",
    color: "#2B2018",
  },
  statLabel: {
    marginTop: 4,
    color: "#7A6859",
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#0C8E69",
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryAction: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#EFE7DE",
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DECFBF",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  secondaryActionText: {
    color: "#B0412E",
    fontWeight: "700",
  },
  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ECE2D8",
    padding: 10,
    paddingLeft: 15,
    gap: 3,
  },
  cardLink: {
    borderRadius: 16,
    width: "100%",
  },
  plate: {
    fontSize: 13,
    color: "#5D5145",
    letterSpacing: 1,
    fontWeight: "700",
  },
  model: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1D140D",
  },
  km: {
    color: "#7D6C5E",
  },
  detailText: {
    marginTop: 2,
    color: "#845D3F",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryActionActive: {
    borderColor: "#B0412E",
    backgroundColor: "#FFF0EC",
  },
  secondaryActionTextActive: {
    color: "#B0412E",
  },
  vehicleCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#B0412E",
    backgroundColor: "#FFFFFF",
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#B0412E",
    backgroundColor: "#B0412E",
  },
  cardContent: {
    flex: 1,
  },
});
