import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SERVICES = ["Plumber","Electrician","Handyman","Mechanic","Locksmith","Cleaner"];

export default function HomeScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services</Text>

      <View style={styles.grid}>
        {SERVICES.map(s => (
          <Pressable key={s} style={styles.card} onPress={() => nav.navigate("Book", { service: s })}>
            <Text style={styles.cardTitle}>{s}</Text>
            <Text style={styles.cardSub}>Instant booking</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.title, { marginTop: 24 }]}>Request a Fixer</Text>
      <Pressable style={[styles.button, { alignSelf: "center" }]} onPress={() => nav.navigate("Book")}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>See prices</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 32 },
  title: { fontSize: 28, fontWeight: "800", color: "#0D3B66", textAlign: "center", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "center" },
  card: { width: 150, backgroundColor: "#F9FAFB", borderColor: "#E5E7EB", borderWidth: 1, borderRadius: 12, padding: 16 },
  cardTitle: { fontWeight: "700" },
  cardSub: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  button: { backgroundColor: "#0D3B66", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, marginTop: 12 }
});
