import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ReceiptScreen() {
  const route = useRoute<any>();
  const { jobId } = route.params ?? {};
  const [sent, setSent] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleSubmitRating = () => {
    console.log('Rating submitted:', { rating, comment, jobId });
    setSent(true);
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((starValue) => (
          <Pressable 
            key={starValue}
            style={styles.starButton}
            onPress={() => setRating(starValue)}
          >
            <Text style={[
              styles.starText, 
              rating >= starValue ? styles.orangeStar : styles.grayStar
            ]}>
              ★
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipt</Text>
      <Text style={styles.jobText}>Thanks for booking. # {jobId || '12345'}</Text>
      
      {!sent && (
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Rate your experience</Text>
          
          {renderStars()}
          
          <Text style={styles.ratingText}>
            {rating > 0 ? `${rating} stars` : 'Tap to rate'}
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
      )}
      
      {sent && (
        <View style={styles.thankYouSection}>
          <Text style={styles.thankYouText}>✅ Thanks!</Text>
          <Text style={styles.finalRating}>You rated: {rating} ★</Text>
          {comment && <Text style={styles.finalComment}>"{comment}"</Text>}
        </View>
      )}
    </View>
  );
}

const styles = {
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 32,
    backgroundColor: '#FFFFFF'
  },
  title: { 
    fontSize: 20, 
    fontWeight: "700" as const,
    marginBottom: 8,
    color: '#0D3B66'
  },
  jobText: {
    fontSize: 16,
    marginBottom: 24,
    color: '#6B7280'
  },
  ratingSection: {
    marginTop: 16,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginBottom: 16,
    textAlign: "center" as const,
    color: '#0D3B66'
  },
  starsContainer: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingVertical: 20,
  },
  starButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  starText: {
    fontSize: 32,
    textAlign: "center" as const,
  },
  grayStar: {
    color: '#D1D5DB',
  },
  orangeStar: {
    color: '#F59E0B',
  },
  ratingText: {
    textAlign: "center" as const,
    fontSize: 16,
    fontWeight: "600" as const,
    color: '#0D3B66',
    marginBottom: 20,
  },
  commentSection: {
    marginBottom: 20,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 8,
    color: '#374151'
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    minHeight: 80,
  },
  button: { 
    marginTop: 12, 
    backgroundColor: "#0D3B66", 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center" as const 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "600" as const,
    fontSize: 16 
  },
  thankYouSection: {
    alignItems: "center" as const,
    marginTop: 24,
    padding: 20,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
  },
  thankYouText: { 
    fontSize: 18,
    fontWeight: "600" as const,
    color: '#16A34A',
    marginBottom: 8,
  },
  finalRating: {
    fontSize: 16,
    color: '#0D3B66',
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  finalComment: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: "italic" as const,
    textAlign: "center" as const,
    marginTop: 8,
  }
};