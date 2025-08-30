import React from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function FindingScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { jobId } = route.params ?? {};

  React.useEffect(() => {
    const t = setTimeout(() => nav.navigate("Track", { jobId }), 1000);
    return () => clearTimeout(t);
  }, [jobId, nav]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Finding a nearby licensed fixr…</Text>
      <Text style={{ color: "#6B7280", marginTop: 8 }}>Job: {jobId}</Text>
    </View>
  );
}
