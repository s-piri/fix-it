import React from "react";
import { View, Text, Pressable, StyleSheet, Animated, Image } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Track: { jobId: string; location?: string; details?: string };
  Receipt: { jobId: string };
};
type TrackRoute = RouteProp<RootStackParamList, "Track">;

type Status = "enroute" | "onsite" | "completed";

export default function TrackScreen() {
  const route = useRoute<TrackRoute>();
  const nav = useNavigation<any>();
  const { jobId, location, details } = route.params ?? {};

  // ETA + status (mock progression)
  const [eta, setEta] = React.useState(10);
  const [status, setStatus] = React.useState<Status>("enroute");

  React.useEffect(() => {
    const tick = setInterval(() => setEta((e) => Math.max(0, e - 1)), 1000);
    return () => clearInterval(tick);
  }, []);
  React.useEffect(() => {
    if (eta === 3) setStatus("onsite");
    if (eta === 0) {
      setStatus("completed");
      nav.navigate("Receipt", { jobId, pro });
    }
  }, [eta, nav, jobId]);

  const pro = {
    name: "Van Songyot",
    trade: "Locksmith",
    rating: 4.9,
    jobs: 124,
    distanceKm: 2.1,
    etaMin: Math.max(eta, 1),
    vehicle: "Toyota HiAce",
    // remote placeholder image so there's no bundler path issues
    // replace with: photo: require("../../assets/pros/alex.png") once you add a file
    photo: require("../../assets/pros/driver1.jpg"),
  };

  // --- Popup animation state ---
  const [showProfile, setShowProfile] = React.useState(true); // show immediately on match
  const veilOpacity = React.useRef(new Animated.Value(0)).current;
  const sheetOpacity = React.useRef(new Animated.Value(0)).current;
  const sheetScale = React.useRef(new Animated.Value(0.92)).current;

  React.useEffect(() => {
    if (showProfile) {
      Animated.parallel([
        Animated.timing(veilOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(sheetOpacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(sheetScale, { toValue: 1, useNativeDriver: true, friction: 7, tension: 90 }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(veilOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
        Animated.timing(sheetOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [showProfile, veilOpacity, sheetOpacity, sheetScale]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your pro is on the way</Text>
      <Text>ETA: {eta} min(s)</Text>

      <View style={styles.map}>
        <Text>Live map placeholder</Text>
      </View>

      <Text style={{ marginTop: 8, color: "#666" }}>
        Status: {status} • Job #{jobId}
      </Text>
      {location ? <Text style={{ color: "#666" }}>Location: {location}</Text> : null}
      {details ? <Text style={{ color: "#666" }}>Details: {details}</Text> : null}

      {/* --- Profile popup overlay --- */}
      {showProfile && (
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.veil, { opacity: veilOpacity }]} />
          <View style={styles.centerWrap} pointerEvents="box-none">
            <Animated.View
              style={[
                styles.sheet,
                { opacity: sheetOpacity, transform: [{ scale: sheetScale }] },
              ]}
            >
              <View style={styles.photoWrap}>
                <Image source={pro.photo as any} style={styles.photo} />
              </View>

              <Text style={styles.proName}>{pro.name}</Text>
              <Text style={styles.proSub}>{pro.trade}</Text>

              <View style={styles.row}>
                <Text style={styles.badge}>★ {pro.rating.toFixed(1)}</Text>
                <Text style={styles.sep}>•</Text>
                <Text style={styles.badge}>{pro.jobs} jobs</Text>
                <Text style={styles.sep}>•</Text>
                <Text style={styles.badge}>{pro.distanceKm.toFixed(1)} km away</Text>
              </View>

              <View style={[styles.row, { marginTop: 8 }]}>
                <Text style={{ color: "#374151" }}>Vehicle: {pro.vehicle}</Text>
              </View>

              <View style={[styles.row, { marginTop: 16 }]}>
                <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => setShowProfile(false)}>
                  <Text style={styles.btnPrimaryText}>Start tracking</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.btnGhost]} onPress={() => setShowProfile(false)}>
                  <Text style={styles.btnGhostText}>Close</Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
}

const BRAND = "#0D3B66";
const BORDER = "#E5E7EB";
const MUTED = "#F3F4F6";

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, paddingTop: 32 },
  title: { fontSize: 20, fontWeight: "700" },
  map: {
    marginTop: 12,
    padding: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    borderRadius: 10,
    backgroundColor: MUTED,
  },

  // overlay
  veil: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  centerWrap: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", padding: 16 },
  sheet: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    alignItems: "center",
  },

  // photo
  photoWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: BRAND,
    marginBottom: 8,
  },
  photo: { width: "100%", height: "100%", resizeMode: "cover" },

  proName: { fontSize: 18, fontWeight: "800", color: "#111827", marginTop: 4 },
  proSub: { color: "#374151", marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", justifyContent: "center" },
  badge: {
    backgroundColor: MUTED,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 4,
    color: "#111827",
  },
  sep: { color: "#9CA3AF", marginHorizontal: 2 },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    marginHorizontal: 6,
    minWidth: 140,
    alignItems: "center",
  },
  btnPrimary: { backgroundColor: BRAND, borderColor: BRAND },
  btnPrimaryText: { color: "#fff", fontWeight: "700" },
  btnGhost: { backgroundColor: "#fff" },
  btnGhostText: { color: "#111827", fontWeight: "700" },
});
