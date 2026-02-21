interface ImportMetaEnv {
  readonly N8N_WEBHOOK_TOKEN: string
  readonly N8N_WEBHOOK_URL_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}