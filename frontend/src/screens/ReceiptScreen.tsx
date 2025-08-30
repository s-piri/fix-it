import React from "react";
import { View, Text, Pressable, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

// Helper function to map backend profile picture paths to local assets
const getProfilePicture = (profilePicturePath?: string) => {
  if (!profilePicturePath) {
    return require("../../assets/pros/driver1.jpg");
  }
  
  // Map backend paths to local assets
  if (profilePicturePath.includes('1.png')) {
    return require("../../assets/pros/1.png");
  } else if (profilePicturePath.includes('2.png')) {
    return require("../../assets/pros/2.png");
  } else if (profilePicturePath.includes('3.png')) {
    return require("../../assets/pros/3.png");
  } else if (profilePicturePath.includes('4.png')) {
    return require("../../assets/pros/4.png");
  }
  
  // Default fallback
  return require("../../assets/pros/driver1.jpg");
};

type Pro = {
  name: string;
  trade: string;
  rating: number;
  jobs: number;
  photo: any; // ImageSourcePropType
  // API provider fields
  provider_name?: string;
  provider_id?: number;
  eta?: number;
  profile_picture?: string;
};

export default function ReceiptScreen() {
  const route = useRoute<any>();
  const { jobId, pro } = route.params ?? {};

  const [sent, setSent] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  // Process provider data from API or use fallback
  const proInfo: Pro = pro ? {
    name: pro.name || pro.provider_name || "Professional",
    trade: pro.trade || "Service Provider",
    rating: pro.rating || 4.5,
    jobs: pro.jobs || 100,
    photo: pro.photo || getProfilePicture(pro.profile_picture),
    provider_id: pro.provider_id,
    eta: pro.eta,
  } : {
    name: "John Doe",
    trade: "Cleaner",
    rating: 4.9,
    jobs: 124,
    photo: getProfilePicture(),
  };

  const handleSubmitRating = () => {
    console.log("Rating submitted:", { rating, comment, jobId, pro: proInfo });
    setSent(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>Receipt</Text>
      <Text style={styles.jobText}>Thanks for booking. # {jobId || "12345"}</Text>

      {/* Pro summary card */}
      <View style={styles.proCard}>
        <View style={styles.avatarWrap}>
          <Image source={proInfo.photo} style={styles.avatar} />
        </View>
        <Text style={styles.proName}>{proInfo.name}</Text>
        <Text style={styles.proSub}>{proInfo.trade}</Text>
        <View style={styles.proRow}>
          <View style={styles.row}>
            <Text style={styles.badge}>★ {Number(proInfo.rating).toFixed(1)}</Text>
            <Text style={styles.sep}>•</Text>
            <Text style={styles.badge}>{proInfo.jobs} jobs</Text>
          </View>
        </View>
      </View>

      {!sent ? (
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Rate your FIXR</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((v) => (
              <Pressable key={v} style={styles.starButton} onPress={() => setRating(v)}>
                <Text style={[styles.starText, rating >= v ? styles.orangeStar : styles.grayStar]}>★</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.ratingText}>
            {rating > 0 ? `${rating} ${rating === 1 ? "star" : "stars"}` : "Tap to rate"}
          </Text>

          <View style={styles.commentSection}>
            <Text style={styles.commentLabel}>Comments</Text>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Share your feedback..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Pressable
            onPress={handleSubmitRating}
            style={[styles.button, { opacity: rating > 0 ? 1 : 0.6 }]}
            disabled={rating === 0}
          >
            <Text style={styles.buttonText}>Submit rating</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.thankYouSection}>
          <Text style={styles.thankYouText}>Thanks!</Text>
          <Text style={styles.finalRating}>You rated: {rating} ★</Text>
          {comment ? <Text style={styles.finalComment}>"{comment}"</Text> : null}
                 </View>
       )}
     </ScrollView>
   );
}

const BRAND = "#0D3B66";
const BORDER = "#D1D5DB";
const MUTED = "#F9FAFB";

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 32, 
    paddingBottom: 32,
    backgroundColor: "#FFFFFF",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: BRAND },
  jobText: { fontSize: 16, marginBottom: 16, color: "#6B7280" },

  proCard: {
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: BRAND,
    marginBottom: 8,
  },
  avatar: { width: "100%", height: "100%", resizeMode: "cover" },
  proName: { fontSize: 18, fontWeight: "800", color: "#111827", marginTop: 4 },
  proSub: { color: "#374151", marginTop: 2 },
  proRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
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
  row: { flexDirection: "row", alignItems: "center" },

  ratingSection: { 
    marginTop: 16,
    paddingHorizontal: 8,
    width: "100%",
    maxWidth: "100%",
  },
  ratingTitle: { fontSize: 18, fontWeight: "600", marginBottom: 16, textAlign: "center", color: BRAND },
  starsContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 20 },
  starButton: { padding: 8, marginHorizontal: 2 },
  starText: { fontSize: 32, textAlign: "center" },
  grayStar: { color: "#D1D5DB" },
  orangeStar: { color: "#F59E0B" },
  ratingText: { textAlign: "center", fontSize: 16, fontWeight: "600", color: BRAND, marginBottom: 20 },
  commentSection: { marginBottom: 20 },
  commentLabel: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#374151" },
  commentInput: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: MUTED,
    minHeight: 80,
    maxWidth: "100%",
    width: "100%",
  },
  button: { 
    marginTop: 12, 
    backgroundColor: BRAND, 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center",
    maxWidth: "100%",
    width: "100%",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },

  thankYouSection: { 
    alignItems: "center", 
    marginTop: 24, 
    padding: 24, 
    backgroundColor: "#F0FDF4", 
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  thankYouText: { fontSize: 18, fontWeight: "600", color: "#16A34A", marginBottom: 8 },
  finalRating: { fontSize: 16, color: BRAND, fontWeight: "600", marginBottom: 4 },
  finalComment: { fontSize: 14, color: "#6B7280", fontStyle: "italic", textAlign: "center", marginTop: 8 },
});
