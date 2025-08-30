import React from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function TrackScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { jobId } = route.params ?? {};
  const [eta, setEta] = React.useState(10);
  const [status, setStatus] = React.useState("enroute");

  React.useEffect(() => {
    const tick = setInterval(() => setEta(e => Math.max(0, e - 1)), 1000);
    return () => clearInterval(tick);
  }, []);
  React.useEffect(() => {
    if (eta === 3) setStatus("onsite");
    if (eta === 0) { setStatus("completed"); nav.navigate("Receipt", { jobId }); }
  }, [eta, nav, jobId]);

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 32 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Your pro is on the way</Text>
      <Text>ETA: ~{eta} min</Text>
      <View style={{ marginTop: 12, padding: 12, borderWidth: 1, borderStyle: "dashed", borderColor: "#cbd5e1", borderRadius: 10 }}>
        <Text>Live map placeholder</Text>
      </View>
      <Text style={{ marginTop: 8, color: "#666" }}>Status: {status}</Text>
    </View>
  );
}
