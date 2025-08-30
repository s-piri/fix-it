import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SERVICES = [
  { id: 1, name: "Plumber",     image: require("../../assets/role3.png") },
  { id: 2, name: "Electrician", image: require("../../assets/role1.png") },
  { id: 3, name: "Handyman",    image: require("../../assets/role2.png") },
  { id: 4, name: "Mechanic",    image: require("../../assets/role4.png") },
  { id: 5, name: "Locksmith",   image: require("../../assets/role5.png") },
  { id: 6, name: "Cleaner",     image: require("../../assets/role6.png") },
];
export default function HomeScreen() {
  const nav = useNavigation<any>();
  const [location, setLocation] = React.useState("");
  const [details, setDetails] = React.useState("");

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* content column */}
      <View style={styles.container}>
        {/* Nav bar (simple, static) */}
        <View style={styles.navbar}>
          <Text style={styles.logo}>FIX IT</Text>
          <View style={styles.navLinks}>
            <Text style={styles.navLink}>Fix Now</Text>
            <Text style={styles.navLink}>About</Text>
            <Text style={styles.navLink}>Help</Text>
            <Pressable style={styles.signInBtn} onPress={() => nav.navigate("Login")}>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.rule} />

        {/* Services */}
        <Text style={styles.sectionTitle}>Services</Text>

        <View style={styles.grid}>
          {SERVICES.map((s) => (
            <Pressable
              key={s.id}
              style={styles.card}
              onPress={() => nav.navigate("Book", { service: s.name })}
            >
              <Image source={s.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{s.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Request a Fixer */}
        <Text style={[styles.sectionTitle, { marginTop: 36 }]}>
          Request a Fixer
        </Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            placeholder="Details"
            value={details}
            onChangeText={setDetails}
            style={[styles.input, { height: 56 }]}
          />
          <Pressable
            onPress={() => nav.navigate("Book", { location, details })}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Fix It!</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const BRAND = "#0D3B66";
const BORDER = "#E5E7EB";
const MUTED = "#F3F4F6";

const styles = StyleSheet.create({
  page: {
    paddingBottom: 48,
  },
  container: {
    width: "100%",
    maxWidth: 1120,       // similar to your Figma width
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  logo: {
    color: BRAND,
    fontWeight: "900",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  } as any,
  navLink: { color: "#111827" },
  signInBtn: {
    backgroundColor: BRAND,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  signInText: { color: "#fff", fontWeight: "700" },
  rule: { height: 6, backgroundColor: BRAND, marginTop: 8 },

  sectionTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: BRAND,
    textAlign: "center",
    marginVertical: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  } as any,

  card: {
    width: "32%",
    minWidth: 300,
    backgroundColor: MUTED,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 10,
    padding: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  cardImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "700", fontSize: 14 },

  form: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 610,
    marginTop: 8,
    gap: 12,
  } as any,
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: MUTED,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  cta: {
    alignSelf: "center",
    backgroundColor: BRAND,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 6,
  },
  ctaText: { color: "#fff", fontWeight: "900" },
});
