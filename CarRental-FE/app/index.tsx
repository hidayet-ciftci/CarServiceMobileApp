import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function EntryScreen() {
  return (
    <ThemedView style={styles.page}>
      <ThemedView style={styles.backgroundCircleA} />
      <ThemedView style={styles.backgroundCircleB} />

      <View style={styles.headerBox}>
        <ThemedText style={styles.brand}>Araç Bakım Muayene</ThemedText>
        <ThemedText style={styles.title}>Araç Bakım Uygulaması</ThemedText>
        <ThemedText style={styles.subtitle}>
          Lutfen giris tipini secin
        </ThemedText>
      </View>

      <Link href="/customer/customer-access" style={styles.choiceCard}>
        <View>
          <ThemedText style={styles.choiceLabel}>Musteri Girisi </ThemedText>
          <ThemedText style={styles.choiceDesc}>
            Telefon numarasi ile arac ve servis kaydini goruntule
          </ThemedText>
        </View>
      </Link>

      <Link href="/user-login" style={styles.choiceCardDark}>
        <View>
          <ThemedText style={styles.choiceLabelDark}>
            Kullanici Girisi
          </ThemedText>
          <ThemedText style={styles.choiceDescDark}>
            Email ve şifre ile yonetim paneline gecis yap
          </ThemedText>
        </View>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F7FBFF",
    padding: 20,
    justifyContent: "center",
    gap: 16,
  },
  backgroundCircleA: {
    position: "absolute",
    top: -120,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#D2EEFF",
  },
  backgroundCircleB: {
    position: "absolute",
    bottom: -130,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E4F8EF",
  },
  headerBox: {
    marginBottom: 4,
    gap: 6,
  },
  brand: {
    alignSelf: "flex-start",
    backgroundColor: "#0F3754",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "700",
  },
  title: {
    lineHeight: 35,
    fontSize: 30,
    fontWeight: "800",
    color: "#0F2234",
  },
  subtitle: {
    color: "#4E647A",
    fontSize: 16,
  },
  choiceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8E7F5",
    padding: 18,
    gap: 6,
  },
  choiceLabel: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0E3E61",
  },
  choiceDesc: {
    color: "#577088",
    lineHeight: 20,
  },
  choiceCardDark: {
    backgroundColor: "#1D2F3E",
    borderRadius: 20,
    padding: 18,
    gap: 6,
  },
  choiceLabelDark: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  choiceDescDark: {
    color: "#BBD2E3",
    lineHeight: 20,
  },
});
