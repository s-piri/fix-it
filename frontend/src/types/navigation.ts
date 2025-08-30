export type RootStackParamList = {
  Home: undefined;
  Finding: { jobId: string; location: string; details: string };
  Track: { jobId: string; location: string; details: string };
  Receipt: { jobId: string };
};
