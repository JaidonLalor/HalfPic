// src/electron.d.ts
export interface ElectronFile extends File {
  path: string;
}

export interface ElectronAPI {
  invoke(channel: string, ...args: any[]): Promise<any>;
  selectFiles(): Promise<string[]>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}