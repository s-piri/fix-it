import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ReceiptScreen() {
  const route = useRoute<any>();
  const { jobId } = route.params ?? {};
  const [sent, setSent] = React.useState(false);

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 32 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Receipt</Text>
      <Text>Thanks for booking. # {jobId}</Text>
      <Pressable onPress={() => setSent(true)} style={{ marginTop: 12, backgroundColor: "#0D3B66", padding: 12, borderRadius: 10, alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Submit rating</Text>
      </Pressable>
      {sent && <Text style={{ marginTop: 8 }}>✅ Thanks!</Text>}
    </View>
  );
}
