import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native"; 
import { useNavigation, useRoute } from "@react-navigation/native";
import ServiceCard from "./card";
import { Animated, Easing } from "react-native";
import { ActivityIndicator } from "react-native";

function useFadeInUp(delay = 0) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(12)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [delay, opacity, translateY]);

  return { opacity, transform: [{ translateY }] };
}


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
  const route = useRoute<any>();
  const [location, setLocation] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleLogout = () => {
    // Use web-compatible confirmation dialog
    const confirmed = window.confirm("Are you sure you want to logout?");
    
    if (confirmed) {
      try {
        // Call the logout function passed from App.tsx
        if (route.params?.onLogout) {
          route.params.onLogout();
        } else {
          // Fallback: direct localStorage removal and reload
          localStorage.removeItem('user');
          window.location.reload();
        }
      } catch (error) {
        console.log('Error logging out:', error);
      }
    }
  };

  const ctaScale = React.useRef(new Animated.Value(1)).current;
  const onCtaIn = () => {
    Animated.spring(ctaScale, {
      toValue: 0.9,              
      speed: 20,                    
      bounciness: 20,           
      useNativeDriver: true,
    }).start();
  };
  
  const onCtaOut = () => {
    Animated.spring(ctaScale, {
      toValue: 1,                
      speed: 12,                 
      bounciness: 20,            
      useNativeDriver: true,
    }).start();
  };
  const logoOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
      Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, [logoOpacity]);
  return (
    <ScrollView contentContainerStyle={[styles.page, { alignItems: "center", paddingHorizontal: 16 }]}>
      {/* content column */}
      <View style={styles.container}>
        {/* Nav bar (simple, static) */}
        <View style={styles.navbar}>
          <Animated.Image
            source={require("../../assets/logo.png")}
            style={[styles.logoImage, { opacity: logoOpacity }]}
          />
          <View style={styles.navLinks}>
            <Text style={styles.navLink}>About</Text>
            <Text style={styles.navLink}>Help</Text>
            <Pressable style={styles.signInBtn} onPress={handleLogout}>
              <Text style={styles.signInText}>Logout</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.rule} />

        {/* Services */}
        <Text style={styles.sectionTitle}>Services</Text>

        <View style={styles.grid}>
          {SERVICES.map((s, i) => {
            const anim = useFadeInUp(i * 70);
            return (
              <Animated.View key={s.id} style={[styles.cardWrap, anim]}>
                <ServiceCard
                  label={s.name}
                  icon={s.image}
                  selected={selected === s.id}
                  onPress={() => setSelected(s.id)}
                />
              </Animated.View>
            );
          })}
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
          <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
          <Pressable
            onPressIn={onCtaIn}
            onPressOut={onCtaOut}
    
            onPress={() => nav.navigate("Finding", { location, details })}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Fix It!</Text>
          </Pressable>
        </Animated.View>
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
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    // maxWidth: 1120,  
    minHeight: 1000,     
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
    fontSize: 50,
    fontWeight: "700",
    fontFamily: "Geologica",
    color: BRAND,
    textAlign: "center",
    marginVertical: 70,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",   
    columnGap: 24,               
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
    marginBottom: 30,
  },
  cardImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "700", fontSize: 14 , fontFamily: "Geologica"},
  cardWrap: {marginBottom: 20},
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
  logoImage: {
    width: 100,  
    height: 20,   
    resizeMode: "contain", 
  },
  cta: {
    alignSelf: "center",
    backgroundColor: BRAND,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 12,
  },
  ctaText: { color: "#fff", fontWeight: "400", fontFamily: "Geologica",},
});
