declare module '@capacitor/cli' {
  export interface CapacitorConfig {
    appId: string;
    appName: string;
    webDir: string;
    plugins?: Record<string, unknown>;
    server?: {
      androidScheme?: string;
      iosSchemeName?: string;
    };
  }
}
