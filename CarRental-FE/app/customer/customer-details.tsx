import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { unloginCustomerDataTypes } from "@/constants/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function CustomerDetailsScreen() {
  const unLoginCustomerData: unloginCustomerDataTypes[] = useSelector(
    (state: RootState) => state.unloginCustomerData.CustomerData,
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <ThemedText>Go Back</ThemedText>
        </TouchableOpacity>
        <ThemedView style={styles.hero}>
          <ThemedText style={styles.heroTitle}>Musteri Detaylari</ThemedText>
          <ThemedText style={styles.heroSub}>
            Bu alan email adresi ile bulunan kişi, arac ve servis bilgilerini
            gosterir.
          </ThemedText>
        </ThemedView>

        {unLoginCustomerData.map((unLoginCustomerData, index) => (
          <View key={index}>
            <ThemedText style={{ fontSize: 25, margin: 10 }}>
              Service Kayıt: {index + 1}
            </ThemedText>
            <ThemedView style={styles.infoCard}>
              <ThemedText style={styles.heading}>Kişi bilgileri</ThemedText>
              <ThemedText style={styles.item}>
                İsim: {unLoginCustomerData.fullName ?? "isim bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                email: {unLoginCustomerData.email ?? "email bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Telefon:{" "}
                {unLoginCustomerData.phoneNumber ?? "telefon bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                adres: {unLoginCustomerData.address ?? "adres bilgisi yok"}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoCard}>
              <ThemedText style={styles.heading}>Arac Bilgileri</ThemedText>
              <ThemedText style={styles.item}>
                Plaka: {unLoginCustomerData.plate ?? "plaka bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Model: {unLoginCustomerData.brand ?? "Marka/Model bilgisi yok"}
              </ThemedText>

              <ThemedText style={styles.item}>
                Renk: {unLoginCustomerData.color ?? "renk bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Şase Numarası:{" "}
                {unLoginCustomerData.viN_Number ?? "Şase bilgisi yok"}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoCard}>
              <ThemedText style={styles.heading}>Servis Kaydi</ThemedText>
              <ThemedText style={styles.item}>
                Servis oluşturulma tarihi:{" "}
                {unLoginCustomerData.createdTime
                  ? new Date(
                      unLoginCustomerData.createdTime,
                    ).toLocaleDateString()
                  : "servis oluşturma tarih bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Durum: {unLoginCustomerData.state ?? "Araç Durum bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Not: {unLoginCustomerData.description ?? "açıklama bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Ücret: {unLoginCustomerData.price ?? "fiyat bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Planlanan Bitiş Tarihi:{" "}
                {unLoginCustomerData.plannedEndDate
                  ? new Date(
                      unLoginCustomerData.plannedEndDate,
                    ).toLocaleString()
                  : "Planlanan bitiş tarih bilgisi yok"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Bitiş Tarihi:{" "}
                {unLoginCustomerData.endDate
                  ? new Date(unLoginCustomerData.endDate).toLocaleString()
                  : "Servis devam etmekte"}
              </ThemedText>
              <ThemedText style={styles.item}>
                Sorumlu kişi:{" "}
                {unLoginCustomerData.employer_Name ?? "çalışan bilgisi yok"}
              </ThemedText>
            </ThemedView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5FAF9",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  hero: {
    backgroundColor: "#1F5E63",
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  heroSub: {
    color: "#CFEBED",
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D8E8E6",
    padding: 16,
    gap: 6,
    marginTop: 10,
  },
  heading: {
    fontWeight: "800",
    color: "#153B3E",
    fontSize: 16,
    marginBottom: 2,
  },
  item: {
    color: "#486E71",
  },
  backButton: {
    borderRadius: 14,
    margin: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    right: -275,
    position: "fixed",
  },
});
