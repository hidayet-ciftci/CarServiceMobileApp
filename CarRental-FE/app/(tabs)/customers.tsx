import { deleteButton } from "@/components/Alert-Delete";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { deleteByIdsCustomer } from "@/constants/customerApi";
import { fetchCustomersThunk } from "@/store/customerSlice";
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

export default function CustomersScreen() {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<number[]>([]); /* 
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [customerData, setCustomerData] = useState<customerDataType[]>(); */
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  const { customerData, error, loading } = useSelector(
    (state: RootState) => state.customerStoreData,
  );
  /* 
  const handleGetCustomers = async () => {
    const customerData = await fetchCustomers();
    if (customerData?.success) {
      setCustomerData(customerData.data);
      dispatch(setCustomerStoreData(customerData.data));
      setIsLoading(false);
    } else {
      Toast.show({ type: "error", text1: customerData?.message });
    }
  }; */

  const handleDeleteCustomers = async () => {
    const deletedCustomerData = await deleteByIdsCustomer(selected);
    if (deletedCustomerData) {
      if (deletedCustomerData?.success) {
        Toast.show({ type: "success", text1: deletedCustomerData?.message });
        setSelected([]);
        setDeleteMode(false);
        dispatch(fetchCustomersThunk());
        /* handleGetCustomers(); */
      } else {
        Toast.show({ type: "error", text1: deletedCustomerData?.message });
      }
    }
  };

  useEffect(() => {
    /* setIsLoading(true);
    handleGetCustomers(); */
    dispatch(fetchCustomersThunk());
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
      <ThemedView style={styles.headerCard}>
        <ThemedText style={styles.headerMini}>Musteri Paneli</ThemedText>
        <ThemedText style={styles.headerTitle}>Musteri Is Takibi</ThemedText>
        <ThemedText style={styles.headerText}>
          Musteri goruntuleme, ekleme ve cikarma islemleri icin arayuz taslagi.
        </ThemedText>
      </ThemedView>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryAction}
          onPress={() => {
            deleteMode
              ? deleteButton(
                  handleDeleteCustomers,
                  "Seçilen müşterileri silmek , Servis kayıtlarının ve araçlarının silinmesi sağlar",
                )
              : router.push("/create/new-customer");
          }}
        >
          <ThemedText style={styles.primaryText}>
            {deleteMode ? "Onayla" : "+ Musteri Ekle"}
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
              styles.secondaryText,
              deleteMode && styles.secondaryTextActive,
            ]}
          >
            {deleteMode ? "Vazgec" : "- Musteri Cikar"}
          </ThemedText>
        </Pressable>
      </View>

      <ThemedText style={styles.listTitle}>Musteri Listesi</ThemedText>

      <View style={styles.statsRow}>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statLabel}>
            Toplam Müşteri:{" "}
            <ThemedText style={styles.statValue}>
              {customerData?.length}
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </View>
      {customerData?.map((customer) => (
        <Pressable
          key={customer.id}
          style={styles.cardLink}
          onPress={() => {
            deleteMode
              ? setSelected((prev) =>
                  prev.includes(customer.id)
                    ? prev.filter((i) => i !== customer.id)
                    : [...prev, customer.id],
                )
              : router.push({
                  pathname: "/details/customer-detail/[id]",
                  params: { id: customer.id },
                });
          }}
        >
          <View
            style={[styles.customerCard, deleteMode && styles.customerCardRow]}
          >
            {deleteMode && (
              <ThemedView
                style={
                  selected.includes(customer.id)
                    ? styles.selectedCircle
                    : styles.selectCircle
                }
              />
            )}
            <View style={deleteMode ? styles.cardContent : undefined}>
              <ThemedText style={styles.customerName}>
                {customer?.firstName} {customer?.lastName}
              </ThemedText>
              <ThemedText style={styles.customerMeta}>
                Telefon: {customer?.phoneNumber}
              </ThemedText>
              <ThemedText style={styles.customerMeta}>
                Adres: {customer?.address}
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
    backgroundColor: "#F4F8F2",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  headerCard: {
    backgroundColor: "#234F3F",
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  headerMini: {
    color: "#A4DFCA",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },
  headerText: {
    color: "#D9F1E8",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#0D9A6E",
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryAction: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#E9F0EC",
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D2DCD7",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  secondaryText: {
    color: "#294639",
    fontWeight: "700",
  },
  listTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: "#1D392E",
  },
  customerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE8E2",
    padding: 14,
    gap: 4,
  },
  cardLink: {
    borderRadius: 16,
    width: "100%",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A3127",
  },
  customerMeta: {
    color: "#5D7C6F",
  },
  detailText: {
    marginTop: 4,
    color: "#2A654F",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryActionActive: {
    borderColor: "#294639",
    backgroundColor: "#DFF0E8",
  },
  secondaryTextActive: {
    color: "#1A3127",
  },
  customerCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#294639",
    backgroundColor: "#FFFFFF",
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#294639",
    backgroundColor: "#294639",
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
    borderColor: "#DDE8E2",
    padding: 14,
  },
  statValue: {
    fontWeight: "800",
    color: "#2B2018",
  },
  statLabel: {
    marginTop: 4,
    color: "#2A654F",
  },
});
