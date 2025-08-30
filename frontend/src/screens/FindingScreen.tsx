import React from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { searchProvider, Provider } from "../api/providers";

export default function FindingScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { jobId, jobType } = route.params ?? {};

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [provider, setProvider] = React.useState<Provider | null>(null);

  console.log('FindingScreen started with:', { jobId, jobType });

  React.useEffect(() => {
    const findProvider = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Calling searchProvider with:', { job_type: jobType || 'plumbing', budget: 1000 });
        
        // Call the backend API to find a provider
        const response = await searchProvider({
          job_type: jobType || 'plumbing', // Default to plumbing if no job type provided
          budget: 1000 // Default budget
        });
        
        console.log('Provider found:', response.provider);
        setProvider(response.provider);
        
        // Navigate to Track screen with the found provider
        setTimeout(() => {
          console.log('Navigating to Track with:', { jobId, provider: response.provider });
          nav.navigate("Track", { 
            jobId, 
            provider: response.provider 
          });
        }, 1000);
        
      } catch (err) {
        console.error('Error finding provider:', err);
        setError(err instanceof Error ? err.message : 'Failed to find provider');
        
        // Navigate to Track screen without provider data after error
        setTimeout(() => {
          console.log('Navigating to Track without provider data');
          nav.navigate("Track", { jobId });
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    findProvider();
  }, [jobId, jobType, nav]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {isLoading ? "Finding a nearby licensed FIXR…" : 
         error ? "Error finding provider..." : 
         "Provider found! Redirecting..."}
      </Text>
      <Text style={{ color: "#6B7280", marginTop: 8 }}>Job: {jobId}</Text>
      {jobType && <Text style={{ color: "#6B7280", marginTop: 4 }}>Type: {jobType}</Text>}
      {error && <Text style={{ color: "#EF4444", marginTop: 8 }}>{error}</Text>}
      {provider && <Text style={{ color: "#10B981", marginTop: 8 }}>Provider: {provider.provider_name}</Text>}
    </View>
  );
}
