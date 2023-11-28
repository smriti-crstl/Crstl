export const TASK_STATUS: Record<
  string,
  { text: string; buttonText: string; color: string }
> = {
  "To Do": {
    text: "Crstl will work on it",
    buttonText: "Complete",
    color: "#4E63F8",
    nonAdminText: "Task for your Company Admin",
  },
  "In Progress": {
    text: "Processing info",
    buttonText: "Resume",
    color: "#4E63F8",
    nonAdminText: "Your Company Admin is working on it",
  },
  Paused: {
    text: "Crstl has paused working on it",
    buttonText: "Continue",
    color: "#757E78",
    nonAdminText: "Your Company Admin has paused working on it",
  },
  Blocked: {
    text: "Crstl is blocked on it",
    buttonText: "Resolve",
    color: "#FF4D4F",
    nonAdminText: "Your Company Admin is blocked on it",
  },
};

export const USER_TASK_TYPE = {
  GLOBAL_EDI_SETUP: "global-edi-setup",
  ALERTS_SETUP: "alerts-setup",
  EDI_SETUP: "edi-setup",
};
