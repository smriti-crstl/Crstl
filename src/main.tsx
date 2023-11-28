import "./index.css";
import "react-app-polyfill/stable";

import BootApp from "boot";
import React from "react";
import ReactDOM from "react-dom";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import reportWebVitals from "./reportWebVitals";
import { amplitude } from "presentation/utils";
import { getAppEnvironment } from "./appEnvironment";
// import { setupInterceptorsTo } from "./interceptor";

Sentry.init({
  dsn:
    "https://05d5d84bd09c4b70928493a1c3e3badf@o573966.ingest.sentry.io/5806579",
  environment: getAppEnvironment(),
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <BootApp />
  </React.StrictMode>,
  document.getElementById("root")
);

amplitude.logEvent("Application loaded");
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
