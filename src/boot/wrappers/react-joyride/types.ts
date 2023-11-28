import { Step } from "react-joyride";

interface StepState extends Step {
  route: string;
}

export interface TourState {
  run: boolean;
  stepIndex: number;
  steps: StepState[];
  tourActive: boolean;
}

export interface StepItem {
  title: string;
  selector: string;
  message: string;
  flagState: boolean | "Visible" | "Clickable" | "Hidden";
  route: string;
}
