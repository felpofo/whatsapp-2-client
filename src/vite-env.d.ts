///<reference types="vite/client"/>

interface ImportMetaEnv {
  readonly VITE_SERVER_IP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
