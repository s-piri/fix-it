import React from "react";
import { View, Text, Pressable, Animated, Image, StyleSheet } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Provider } from "../api/providers";
import { trackScreenStyles } from "./TrackScreen.styles";

type RootStackParamList = {
  Track: { 
    jobId: string; 
    location?: string; 
    details?: string;
    provider?: Provider | null;
  };
  Receipt: { jobId: string };
};
type TrackRoute = RouteProp<RootStackParamList, "Track">;

type Status = "enroute" | "onsite" | "completed";

interface Location {
  latitude: number;
  longitude: number;
}

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

// Helper function to process backend provider data for frontend display
const processProviderData = (provider: Provider) => {
  // Extract first name from provider_name
  const nameParts = (provider.provider_name || "Professional Provider").split(' ');
  const firstName = nameParts[0] || "Professional";
  const lastName = nameParts[1] || "Provider";
  
  // Convert ETA string to minutes for display and cap at 20 for demo
  const etaString = provider.eta || "10 minutes";
  let etaMinutes = 10; // Default fallback
  
  if (etaString.includes('minutes')) {
    etaMinutes = Math.min(parseInt(etaString.split(' ')[0]) || 10, 20);
  } else if (etaString.includes('hour')) {
    etaMinutes = Math.min(parseInt(etaString.split(' ')[0]) * 60 || 60, 20);
  } else if (etaString.includes('hours')) {
    etaMinutes = Math.min(parseInt(etaString.split(' ')[0]) * 60 || 60, 20);
  }
  
  // Safely capitalize job type with fallback
  const jobType = provider.job_type || "cleaner";
  const capitalizedJobType = jobType.charAt(0).toUpperCase() + jobType.slice(1);
  
  return {
    name: `${firstName} ${lastName}`,
    trade: capitalizedJobType,
    rating: provider.rating || 4.5,
    jobs: provider.jobs || 100,
    distanceKm: (Math.random() * 5 + 0.5).toFixed(1),
    etaMin: etaMinutes,
    vehicle: provider.vehicle || "Toyota HiAce",
    photo: getProfilePicture(provider.profile_picture),
    // Include all backend data for ReceiptScreen
    provider_id: provider.provider_id || "FALLBACK_001",
    provider_name: provider.provider_name || "Professional Provider",
    job_type: jobType,
    eta: etaString,
    hourly_rate: provider.hourly_rate || 75.00,
    is_available: provider.is_available !== undefined ? provider.is_available : true,
    profile_picture: provider.profile_picture,
  };
};

export default function TrackScreen() {
  const route = useRoute<TrackRoute>();
  const nav = useNavigation<any>();
  const { jobId, location, details, provider } = route.params ?? {};

  // ETA + status (mock progression)
  const [eta, setEta] = React.useState(() => {
    if (provider?.eta) {
      // Convert ETA string to minutes for display
      const etaString = provider.eta;
      if (etaString.includes('minutes')) {
        return Math.min(parseInt(etaString.split(' ')[0]) || 10, 20);
      } else if (etaString.includes('hour')) {
        return Math.min(parseInt(etaString.split(' ')[0]) * 60 || 60, 20);
      } else if (etaString.includes('hours')) {
        return Math.min(parseInt(etaString.split(' ')[0]) * 60 || 60, 20);
      }
    }
    return 10; // Default fallback
  });
  const [status, setStatus] = React.useState<Status>("enroute");
  
  // Location tracking
  const [proLocation, setProLocation] = React.useState<Location>(() => {
    // Randomize initial provider location within a reasonable distance
    const baseLat = 37.78925; // User latitude
    const baseLng = -122.4314; // User longitude
    const randomOffset = (Math.random()%10 - 0.5) * 0.01; // Random offset within ~1km
    
    return {
      latitude: baseLat + randomOffset,
      longitude: baseLng + randomOffset,
    };
  });
  const [userLocation, setUserLocation] = React.useState<Location>({
    latitude: 37.78925,
    longitude: -122.4314,
  });

  React.useEffect(() => {
    const tick = setInterval(() => setEta((e) => Math.max(0, e - 1)), 1000);
    return () => clearInterval(tick);
  }, []);
  
  React.useEffect(() => {
    if (eta === 3) setStatus("onsite");
    if (eta === 0) {
      setStatus("completed");
      nav.navigate("Receipt", { 
        jobId, 
        pro: pro // Pass the actual provider data from API
      });
    }
  }, [eta, nav, jobId]);

  // Simulate provider movement towards user
  React.useEffect(() => {
    const moveInterval = setInterval(() => {
      setProLocation(prev => {
        // Calculate direction towards user
        const latDiff = userLocation.latitude - prev.latitude;
        const lngDiff = userLocation.longitude - prev.longitude;
        
        // Calculate distance to user
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
        
        // If very close to user, stop moving
        if (distance < 0.0001) {
          return prev;
        }
        
        // Move towards user
        const moveSpeed = 0.0001;
        const moveRatio = Math.min(moveSpeed / distance, 1);
        
        return {
          latitude: prev.latitude + (latDiff * moveRatio),
          longitude: prev.longitude + (lngDiff * moveRatio),
        };
      });
    }, 1000); // Update every second for smoother movement

    return () => clearInterval(moveInterval);
  }, [userLocation]);

  React.useEffect(() => {
    const styleId = 'track-screen-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const getStatusColor = (currentStatus: Status): string => {
    switch(currentStatus) {
      case "enroute": return "#F59E0B";
      case "onsite": return "#10B981";
      case "completed": return "#6366F1";
      default: return "#6B7280";
    }
  };

  const getStatusText = (currentStatus: Status): string => {
    switch(currentStatus) {
      case "enroute": return "On the way";
      case "onsite": return "Arrived on site";
      case "completed": return "Job completed";
      default: return "Unknown";
    }
  };

  // Process provider data from backend API
  const pro = provider ? processProviderData(provider) : {
    name: "Van Songyot",
    trade: "Cleaner",
    rating: 4.9,
    jobs: 124,
    distanceKm: 2.1,
    etaMin: Math.max(eta, 1),
    vehicle: "Toyota HiAce",
    photo: getProfilePicture(),
  };

<<<<<<< HEAD
  //Popup animation state
=======
  //Popup animation
>>>>>>> 268acdf (removed stuff)
  const [showProfile, setShowProfile] = React.useState(true);
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
    <View style={trackScreenStyles.screen}>
      <Text style={trackScreenStyles.title}>Your FIXR is on the way</Text>
      <Text>ETA: ~{eta} min</Text>

      {/* Interactive Map */}
      <View style={trackScreenStyles.mapContainer}>
        <View style={trackScreenStyles.mapBackground}>
          <View style={trackScreenStyles.gridOverlay}></View>
          
          {/* Road System */}
          <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>
            {/* Main roads */}
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#D1D5DB" strokeWidth="8" />
            <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="#D1D5DB" strokeWidth="8" />
            <line x1="30%" y1="0%" x2="30%" y2="100%" stroke="#D1D5DB" strokeWidth="8" />
            <line x1="70%" y1="0%" x2="70%" y2="100%" stroke="#D1D5DB" strokeWidth="6" />
            
            {/* Secondary roads */}
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#E5E7EB" strokeWidth="4" />
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#E5E7EB" strokeWidth="4" />
            
            {/* Road markings */}
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="white" strokeWidth="1" strokeDasharray="20,10" />
            <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="20,10" />
          </svg>
          
          {/* Buildings */}
          <View style={trackScreenStyles.building1}></View>
          <View style={trackScreenStyles.building2}></View>
          <View style={trackScreenStyles.building3}></View>
          
          {/* User location marker */}
          <View style={trackScreenStyles.userMarker}>
            <View style={[trackScreenStyles.markerDot, trackScreenStyles.userDot]}></View>
            <View style={trackScreenStyles.tooltip}>Your Location</View>
          </View>
          
          {/* Provider location marker */}
          <View style={[trackScreenStyles.proMarker, {
            left: `${45 + (proLocation.longitude - (-122.4324)) * 5000}%`,
            top: `${60 + (userLocation.latitude - proLocation.latitude) * 5000}%`,
          }]}>
            <View style={[trackScreenStyles.markerDot, trackScreenStyles.proDot, { backgroundColor: getStatusColor(status) }]}></View>
            <View style={trackScreenStyles.tooltip}>Professional ({getStatusText(status)})</View>
          </View>
          
          {/* Route line */}
          <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none'}}>
            <line 
              x1="45%" 
              y1="60%" 
              x2={`${45 + (proLocation.longitude - (-122.4324)) * 5000}%`} 
              y2={`${60 + (userLocation.latitude - proLocation.latitude) * 5000}%`} 
              stroke={getStatusColor(status)} 
              strokeWidth="4" 
              strokeDasharray="8,4" 
              opacity="0.8" 
            />
          </svg>
          
          {/* Map controls */}
          <View style={trackScreenStyles.mapControls}>
            <Pressable style={trackScreenStyles.mapButton}>
              <Text style={trackScreenStyles.mapButtonText}>+</Text>
            </Pressable>
            <Pressable style={trackScreenStyles.mapButton}>
              <Text style={trackScreenStyles.mapButtonText}>-</Text>
            </Pressable>
          </View>
        </View>
      </View>
      
      {/* Status container */}
      <View style={[trackScreenStyles.statusContainer, { backgroundColor: getStatusColor(status) + '20', borderColor: getStatusColor(status) + '30' }]}>
        <View style={[trackScreenStyles.statusDot, { backgroundColor: getStatusColor(status) }]}></View>
        <Text style={[trackScreenStyles.statusText, { color: getStatusColor(status) }]}>
          Status: {getStatusText(status)}
        </Text>
      </View>
      
      {/* Action buttons */}
      <View style={trackScreenStyles.buttonContainer}>
        <Pressable style={[trackScreenStyles.button, trackScreenStyles.primaryButton]}>
          <Text style={trackScreenStyles.primaryButtonText}>📞 Call Pro</Text>
        </Pressable>
        <Pressable style={[trackScreenStyles.button, trackScreenStyles.secondaryButton]}>
          <Text style={trackScreenStyles.secondaryButtonText}>💬 Message</Text>
        </Pressable>
      </View>

      <Text style={{ marginTop: 8, color: "#666" }}>
        Status: {status} • Job #{jobId}
      </Text>
      {location ? <Text style={{ color: "#666" }}>Location: {location}</Text> : null}
      {details ? <Text style={{ color: "#666" }}>Details: {details}</Text> : null}
      {provider ? <Text style={{ color: "#666" }}>Provider ID: {provider.provider_id}</Text> : null}

      {/* --- Profile popup overlay --- */}
      {showProfile && (
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[trackScreenStyles.veil, { opacity: veilOpacity }]} />
          <View style={trackScreenStyles.centerWrap} pointerEvents="box-none">
            <Animated.View
              style={[
                trackScreenStyles.sheet,
                { opacity: sheetOpacity, transform: [{ scale: sheetScale }] },
              ]}
            >
              <View style={trackScreenStyles.photoWrap}>
                <Image source={pro.photo as any} style={trackScreenStyles.photo} />
              </View>

              <Text style={trackScreenStyles.proName}>{pro.name}</Text>
              <Text style={trackScreenStyles.proSub}>{pro.trade}</Text>

              <View style={trackScreenStyles.row}>
                <Text style={trackScreenStyles.badge}>★ {pro.rating}</Text>
                <Text style={trackScreenStyles.sep}>•</Text>
                <Text style={trackScreenStyles.badge}>{pro.jobs} jobs</Text>
              </View>

              <View style={[trackScreenStyles.row, { marginTop: 8 }]}>
                <Text style={{ color: "#374151" }}>Vehicle: {pro.vehicle}</Text>
              </View>

              <View style={[trackScreenStyles.row, { marginTop: 16 }]}>
                <Pressable style={[trackScreenStyles.btn, trackScreenStyles.btnPrimary]} onPress={() => setShowProfile(false)}>
                  <Text style={trackScreenStyles.btnPrimaryText}>Start tracking</Text>
                </Pressable>
                <Pressable style={[trackScreenStyles.btn, trackScreenStyles.btnGhost]} onPress={() => setShowProfile(false)}>
                  <Text style={trackScreenStyles.btnGhostText}>Close</Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
}
