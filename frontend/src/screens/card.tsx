import { useState } from "react";
import { Platform, Pressable, Image, Text, View, StyleSheet } from "react-native";

type Props = {
  icon: any;     
  label: string;
  onPress?: () => void;
};

export default function ServiceCard({ icon, label, onPress }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const glow = hovered || pressed; 

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.card,
        glow && styles.cardGlow,
        // slight lift effect on web only
        glow && Platform.OS === "web" ? { transform: [{ translateY: -2 }] } : null,
      ]}
    >
      <View style={styles.imageWrap}>
        <Image source={icon} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 140,
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    transitionProperty: Platform.OS === "web" ? "box-shadow, border-color, transform" : undefined,
    transitionDuration: Platform.OS === "web" ? "180ms" : undefined,
  },
  cardGlow: {
    borderColor: "#22c55e", 
    shadowColor: "rgba(34,197,94,1)", 
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  imageWrap: { height: 56, justifyContent: "center" },
  image: { width: 64, height: 56 },
  label: { marginTop: 10, fontWeight: "600", color: "#111" },
});