import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hpccss.ict',
  appName: 'ICT Revision Hub',
  webDir: 'out', // Next.js static export output directory
  server: {
    androidScheme: 'https'
  }
};

export default config;
