interface IBackendServiceNames {
  readonly CORE: string;
  readonly CORE_V2: string;
}

const DEFAULT_FALLBACK_CORE_URL = "https://omnicrstl.uc.r.appspot.com/api/v1";
const DEFAULT_FALLBACK_CORE_V2_URL =
  "http://crstl-api-dot-omnicrstl-sandbox.uc.r.appspot.com/v2";

export const serviceDefinitions: IBackendServiceNames = {
  CORE: process.env.REACT_APP_CORE_URL || DEFAULT_FALLBACK_CORE_URL,
  CORE_V2: process.env.REACT_APP_CORE_V2_URL || DEFAULT_FALLBACK_CORE_V2_URL,
};
