interface IBackendServiceNames {
  readonly CORE: string;
  readonly CORE_V2: string;
}

const DEFAULT_FALLBACK_CORE_URL = "https://omnicrstl.uc.r.appspot.com/api/v1";
const DEFAULT_FALLBACK_CORE_V2_URL =
  "http://crstl-api-dot-omnicrstl-sandbox.uc.r.appspot.com/v2";

export const serviceDefinitions: IBackendServiceNames = {
  CORE: import.meta.env.VITE_APP_CORE_URL || DEFAULT_FALLBACK_CORE_URL,
  CORE_V2: import.meta.env.VITE_APP_CORE_V2_URL || DEFAULT_FALLBACK_CORE_V2_URL,
};
