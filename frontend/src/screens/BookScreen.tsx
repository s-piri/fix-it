import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function BookScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const [service, setService] = React.useState(route.params?.service ?? "Locksmith");
  const [address, setAddress] = React.useState("");
  const [details, setDetails] = React.useState("");

  const confirm = () => {
    const jobId = Math.random().toString(36).slice(2);
    nav.navigate("Finding", { jobId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a job</Text>
      <Text style={styles.label}>Service</Text>
      <TextInput value={service} onChangeText={setService} style={styles.input} />
      <Text style={styles.label}>Enter location</Text>
      <TextInput value={address} onChangeText={setAddress} placeholder="123 George St" style={styles.input} />
      <Text style={styles.label}>Details</Text>
      <TextInput value={details} onChangeText={setDetails} placeholder="Brief description" style={styles.input} />
      <Pressable style={styles.button} onPress={confirm}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm booking</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 32 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  label: { marginTop: 10, marginBottom: 6, color: "#374151" },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, padding: 12, backgroundColor: "#F8FAFC" },
  button: { marginTop: 16, backgroundColor: "#0D3B66", padding: 12, borderRadius: 10, alignItems: "center" }
});
