enum AppEnvironment {
  PRODUCTION = "Production",
  SANDBOX = "Sandbox",
  DEVELOPMENT = "Development",
}

export function getAppEnvironment(): AppEnvironment {
  const appEnvVar = import.meta.env.VITE_APP_ENV;
  switch (appEnvVar) {
    case "PRODUCTION": {
      return AppEnvironment.PRODUCTION;
    }
    case "SANDBOX": {
      return AppEnvironment.SANDBOX;
    }
    case "DEVELOPMENT": {
      return AppEnvironment.DEVELOPMENT;
    }
    default: {
      return AppEnvironment.DEVELOPMENT;
    }
  }
}
