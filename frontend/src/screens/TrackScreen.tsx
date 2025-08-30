import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

interface Location {
  latitude: number;
  longitude: number;
}

type JobStatus = "enroute" | "onsite" | "completed";

interface TrackScreenProps {
  jobId?: string;
}

const TrackScreen: React.FC<TrackScreenProps> = ({ jobId = "12345" }) => {
  const navigation = useNavigation();
  const [showReceipt, setShowReceipt] = useState(false);
  const [eta, setEta] = useState<number>(10);
  const [status, setStatus] = useState<JobStatus>("enroute");
  const [proLocation, setProLocation] = useState<Location>({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 37.78925,
    longitude: -122.4314,
  });

  // 模拟专业人员移动
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setProLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(moveInterval);
  }, []);

  // ETA 倒计时
  useEffect(() => {
    const tick = setInterval(() => {
      setEta(e => Math.max(0, e - 1));
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  // 状态更新
  useEffect(() => {
    if (eta === 3) setStatus("onsite");
    if (eta === 0) {
      setStatus("completed");
      setTimeout(() => {
        setShowReceipt(true);
      }, 1000);
    }
  }, [eta]);

  const getStatusColor = (currentStatus: JobStatus): string => {
    switch(currentStatus) {
      case "enroute": return "#F59E0B";
      case "onsite": return "#10B981";
      case "completed": return "#6366F1";
      default: return "#6B7280";
    }
  };

  const getStatusText = (currentStatus: JobStatus): string => {
    switch(currentStatus) {
      case "enroute": return "On the way";
      case "onsite": return "Arrived on site";
      case "completed": return "Job completed";
      default: return "Unknown";
    }
  };

  const handleComplete = () => {
    // @ts-ignore
    navigation.navigate('Receipt', { jobId });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh',
      padding: '24px',
      paddingTop: '40px',
      backgroundColor: '#FFFFFF',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      width: '100%'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1E40AF',
      marginBottom: '12px',
      margin: '0 0 12px 0'
    },
    eta: {
      fontSize: '20px',
      color: '#6B7280',
      marginBottom: '24px',
      margin: '0 0 24px 0'
    },
    mapContainer: {
      flex: 1,
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '24px',
      boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      backgroundColor: '#F3F4F6',
      position: 'relative' as const,
      minHeight: '400px',
      border: '2px solid #E5E7EB'
    },
    mapBackground: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #EBF8FF 0%, #F0FDF4 50%, #FEF3C7 100%)',
      position: 'relative' as const,
      backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), 
                        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)`
    },
    gridOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2,
      backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px), 
                        linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
      backgroundSize: '40px 40px, 40px 40px, 8px 8px, 8px 8px'
    },
    userMarker: {
      position: 'absolute' as const,
      left: '45%',
      top: '60%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10
    },
    proMarker: {
      position: 'absolute' as const,
      left: `${45 + (proLocation.longitude - (-122.4324)) * 5000}%`,
      top: `${60 + (userLocation.latitude - proLocation.latitude) * 5000}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      transition: 'all 1s ease-in-out'
    },
    markerDot: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: '3px solid white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    },
    userDot: {
      backgroundColor: '#1E40AF'
    },
    proDot: {
      backgroundColor: getStatusColor(status),
      animation: 'pulse 2s infinite'
    },
    tooltip: {
      position: 'absolute' as const,
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '12px',
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: 'white',
      fontSize: '14px',
      padding: '8px 12px',
      borderRadius: '6px',
      whiteSpace: 'nowrap' as const,
      pointerEvents: 'none' as const,
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: getStatusColor(status) + '20',
      marginBottom: '24px',
      border: `2px solid ${getStatusColor(status)}30`
    },
    statusDot: {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: getStatusColor(status),
      marginRight: '12px',
      animation: 'pulse 2s infinite'
    },
    statusText: {
      fontSize: '18px',
      fontWeight: '600',
      color: getStatusColor(status)
    },
    buttonContainer: {
      display: 'flex',
      gap: '16px'
    },
    button: {
      flex: 1,
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      backgroundColor: '#2563EB',
      color: 'white',
      boxShadow: '0 4px 6px rgba(37, 99, 235, 0.25)'
    },
    secondaryButton: {
      backgroundColor: '#F3F4F6',
      color: '#374151',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    receiptContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '16px',
      backgroundColor: 'white',
      textAlign: 'center' as const
    },
    receiptIcon: {
      width: '64px',
      height: '64px',
      backgroundColor: '#10B981',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      color: 'white'
    },
    receiptTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    },
    receiptText: {
      color: '#6B7280',
      marginBottom: '24px',
      margin: '0 0 24px 0'
    },
    receiptButton: {
      backgroundColor: '#2563EB',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    }
  };

  // 添加CSS动画
  useEffect(() => {
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

  if (showReceipt) {
    return (
      <div style={styles.receiptContainer}>
        <div style={styles.receiptIcon}>
          ✓
        </div>
        <h2 style={styles.receiptTitle}>Job Completed!</h2>
        <p style={styles.receiptText}>Your service has been successfully completed.</p>
        <p style={{...styles.receiptText, fontSize: '14px'}}>Job ID: {jobId}</p>
        <button
          style={{
            ...styles.receiptButton,
            transition: 'opacity 0.2s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          onClick={handleComplete}
        >
          Complete
        </button>
      </div>
    );
  }

  const pro = {
    name: "Van Songyot",
    trade: "Locksmith",
    rating: 4.9,
    jobs: 124,
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
    <div style={styles.container}>
      <h1 style={styles.title}>Your FIXR is on the way</h1>
      <p style={styles.eta}>ETA: {eta} min(s)</p>
      
      <div style={styles.mapContainer}>
        <div style={styles.mapBackground}>
          <div style={styles.gridOverlay}></div>
          
          {/* 添加道路系统 */}
          <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>
            {/* 主要道路 */}
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#D1D5DB" strokeWidth="8" />
            <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="#D1D5DB" strokeWidth="8" />
            <line x1="30%" y1="0%" x2="30%" y2="100%" stroke="#D1D5DB" strokeWidth="8" />
            <line x1="70%" y1="0%" x2="70%" y2="100%" stroke="#D1D5DB" strokeWidth="6" />
            
            {/* 次要道路 */}
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#E5E7EB" strokeWidth="4" />
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#E5E7EB" strokeWidth="4" />
            
            {/* 道路标线 */}
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="white" strokeWidth="1" strokeDasharray="20,10" />
            <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="20,10" />
          </svg>
          
          {/* 建筑物 */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '15%',
            height: '15%',
            backgroundColor: '#9CA3AF',
            borderRadius: '4px',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2
          }}></div>
          <div style={{
            position: 'absolute',
            top: '75%',
            left: '75%',
            width: '20%',
            height: '12%',
            backgroundColor: '#6B7280',
            borderRadius: '4px',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2
          }}></div>
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '18%',
            height: '20%',
            backgroundColor: '#4B5563',
            borderRadius: '4px',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2
          }}></div>
          
          {/* 用户位置标记 */}
          <div style={{...styles.userMarker, zIndex: 10}}>
            <div style={{...styles.markerDot, ...styles.userDot}}></div>
            <div style={styles.tooltip}>Your Location</div>
          </div>
          
          {/* 专业人员位置标记 */}
          <div style={{...styles.proMarker, zIndex: 10}}>
            <div style={{...styles.markerDot, ...styles.proDot}}></div>
            <div style={styles.tooltip}>Professional ({getStatusText(status)})</div>
          </div>
          
          {/* 路径线 */}
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
          
          {/* 距离信息面板 */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '16px',
            zIndex: 15,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span style={{color: '#6B7280', fontWeight: '500'}}>Distance:</span>
              <span style={{fontWeight: '700', color: '#111827'}}>{(Math.random() * 2 + 0.5).toFixed(1)} km</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span style={{color: '#6B7280', fontWeight: '500'}}>Speed:</span>
              <span style={{fontWeight: '700', color: '#111827'}}>{(Math.random() * 20 + 30).toFixed(0)} km/h</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{color: '#6B7280', fontWeight: '500'}}>Route:</span>
              <span style={{fontWeight: '700', color: getStatusColor(status)}}>{getStatusText(status)}</span>
            </div>
          </div>
          
          {/* 地图控制按钮 */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 15
          }}>
            <button style={{
              width: '44px',
              height: '44px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#374151'
            }}>+</button>
            <button style={{
              width: '44px',
              height: '44px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#374151'
            }}>-</button>
          </div>
        </div>
      </div>
      
      <div style={styles.statusContainer}>
        <div style={styles.statusDot}></div>
        <span style={styles.statusText}>
          Status: {getStatusText(status)}
        </span>
      </div>
      
      <div style={styles.buttonContainer}>
        <button style={{...styles.button, ...styles.primaryButton}}>
          📞 Call Pro
        </button>
        <button style={{...styles.button, ...styles.secondaryButton}}>
          💬 Message
        </button>
      </div>
    </div>
  );
};

export default TrackScreen;
