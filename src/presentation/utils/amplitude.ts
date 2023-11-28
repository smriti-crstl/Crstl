import _amplitude from "amplitude-js";

const instance = _amplitude.getInstance();

instance.init(import.meta.env.VITE_APP_AMPLITUDE_PROJECT_ID || "");

function logEvent(event: string) {
  return instance.logEvent(event);
}

function logClickEvent(message: string, data?: any) {
  return instance.logEvent(`Click: ${message}`, data);
}

const amplitude = {
  logEvent,
  logClickEvent,
};

export { amplitude };
