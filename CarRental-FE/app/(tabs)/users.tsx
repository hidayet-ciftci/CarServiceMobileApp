import { deleteButton } from "@/components/Alert-Delete";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { deleteByIdUser } from "@/constants/userApi";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUsersThunk } from "@/store/userSlice";
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

export default function ManagementScreen() {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selecteds, setSelecteds] = useState<number[]>([]);
  /* const [userData, setUserData] = useState<userDataType[]>(); */
  /*   const [isLoading, setIsLoading] = useState<boolean>(false); */
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  const { userData, error, loading } = useSelector(
    (state: RootState) => state.userStoreData,
  );

  /*  const handleGetUsers = async () => {
    const userData = await fetchUsers();
    if (userData?.success) {
      dispatch(setUserStoreData(userData.data));
      setUserData(userData.data);
      setIsLoading(false);
    } else {
      Toast.show({ type: "error", text1: userData?.message });
    }
  }; */

  const handleDeleteUser = async () => {
    const deletedUserData = await deleteByIdUser(selecteds);
    if (deletedUserData) {
      if (deletedUserData?.success) {
        Toast.show({ type: "success", text1: deletedUserData?.message });
        setSelecteds([]);
        setDeleteMode(false);
        dispatch(fetchUsersThunk());
        /* handleGetUsers(); */
      } else {
        Toast.show({ type: "error", text1: deletedUserData?.message });
      }
    }
  };

  useEffect(() => {
    /*  setIsLoading(true);
    handleGetUsers(); */
    dispatch(fetchUsersThunk());
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
      <ThemedView style={styles.banner}>
        <ThemedText style={styles.bannerLabel}>Yonetim Merkezi</ThemedText>
        <ThemedText style={styles.bannerTitle}>Kullanici Islemleri</ThemedText>
        <ThemedText style={styles.bannerSubtitle}>
          Kullanici goruntuleme, ekleme, duzenleme ve kaldirma islemleri icin
          tasarim alani.
        </ThemedText>
      </ThemedView>

      <View style={styles.quickActions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => {
            deleteMode
              ? deleteButton(
                  handleDeleteUser,
                  "Seçilen kullanıcıları silmek , Servis kayıtlarının silinmesi sağlar",
                )
              : router.push("/create/new-user");
          }}
        >
          <ThemedText style={styles.actionText}>
            {deleteMode ? "Onayla" : "+ Kullanici Ekle"}
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.actionButtonMuted,
            deleteMode && styles.actionButtonMutedActive,
          ]}
          onPress={() => setDeleteMode((v) => !v)}
        >
          <ThemedText
            style={[
              styles.actionTextMuted,
              deleteMode && styles.actionTextMutedActive,
            ]}
          >
            {deleteMode ? "Vazgec" : "- Kullanici Cikar"}
          </ThemedText>
        </Pressable>
      </View>

      <ThemedText style={styles.sectionTitle}>Kullanici Listesi</ThemedText>
      <View style={styles.statsRow}>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statLabel}>
            Toplam Servis elemanı:{" "}
            <ThemedText style={styles.statValue}>
              {userData?.length ?? "0"}
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            Toplam Müşteri hizmetleri:{" "}
            <ThemedText style={styles.statValue}>
              {userData?.filter((u) => u.roleName == "Manager").length ?? "0"}
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            Toplam Yönetici:{" "}
            <ThemedText style={styles.statValue}>
              {userData?.filter((u) => u.roleName == "Admin").length ?? "0"}
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            Toplam Çalışan:{" "}
            <ThemedText style={styles.statValue}>
              {userData?.filter((u) => u.roleName == "Worker").length ?? "0"}
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </View>
      {userData?.map((user) => (
        <Pressable
          key={user.id}
          style={styles.cardLink}
          onPress={() => {
            deleteMode
              ? setSelecteds((prev) =>
                  prev.includes(user.id)
                    ? prev.filter((i) => i !== user.id)
                    : [...prev, user.id],
                )
              : router.push({
                  pathname: "/details/user-detail/[id]",
                  params: { id: user.id },
                });
          }}
        >
          <View style={styles.card}>
            {deleteMode && (
              <ThemedView
                style={
                  selecteds.includes(user.id)
                    ? styles.selectedCircle
                    : styles.selectCircle
                }
              />
            )}
            <View style={styles.cardLeft}>
              <ThemedText style={styles.cardTitle}>
                {user?.firstName + " " + user?.lastName}
              </ThemedText>
              <ThemedText style={styles.cardSub}>{user?.roleName}</ThemedText>
            </View>
            <View style={styles.cardRight}>
              <ThemedText style={styles.status}>
                {user.status ? "aktif" : "pasif"}
              </ThemedText>
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
    backgroundColor: "#F3F6FB",
  },
  content: {
    padding: 16,
    gap: 14,
  },
  banner: {
    backgroundColor: "#0E4A67",
    borderRadius: 22,
    padding: 20,
    gap: 6,
  },
  bannerLabel: {
    color: "#9ED5EE",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  bannerSubtitle: {
    color: "#D4E8F4",
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#0FA47A",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionButtonMuted: {
    flex: 1,
    backgroundColor: "#EEF2F8",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7DFEA",
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  actionTextMuted: {
    color: "#1B2F42",
    fontWeight: "700",
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "700",
    color: "#18293D",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7EDF5",
    gap: 15,
  },
  cardLink: {
    borderRadius: 16,
    width: "100%",
  },
  cardRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#12243A",
  },
  cardSub: {
    marginTop: 4,
    color: "#60758C",
  },
  status: {
    color: "#0A7C5A",
    backgroundColor: "#DDF9EE",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "700",
  },
  detailText: {
    color: "#2B5678",
    fontSize: 12,
    fontWeight: "700",
  },
  actionButtonMutedActive: {
    borderColor: "#1B2F42",
    backgroundColor: "#E2E9F3",
  },
  actionTextMutedActive: {
    color: "#1B2F42",
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1B2F42",
    backgroundColor: "#FFFFFF",
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1B2F42",
    backgroundColor: "#1B2F42",
  },
  cardLeft: {
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
    borderColor: "#E7EDF5",
    padding: 14,
  },
  statValue: {
    fontWeight: "800",
    color: "#12243A",
  },
  statLabel: {
    marginTop: 4,
    color: "#60758C",
  },
});
