import { useState, useRef, useEffect } from "react";
import { Platform, Pressable, Image, Text, View, StyleSheet, Animated } from "react-native";

type Props = {
  icon: any;     
  label: string;
  onPress?: () => void;
  selected?: boolean;  
};

export default function ServiceCard({ icon, label, onPress, selected }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Animated scale value
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: hovered || pressed ? 1.05 : 1,  
      friction: 5,
      tension: 150,
      useNativeDriver: true,
    }).start();
  }, [hovered, pressed]);

  const glow = hovered || pressed;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[
          styles.card,
          selected && styles.cardSelected,
          (glow || selected) && styles.cardGlow,
        ]}
      >
        <View style={styles.imageWrap}>
          <Image source={icon} style={styles.image} resizeMode="contain" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 180,
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
  cardSelected: {
    backgroundColor: "#fff",
    borderColor: "#22c55e",
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
  image: { width:80, height: 72 },
  label: { marginTop: 25, fontWeight: "500", color: "#111", fontFamily: "Geologica" },
});