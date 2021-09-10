import type { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";
import workInstructions from "./work-instructions.json";

export interface InstructionStep {
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: React.ReactNode[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
}

export const InstructionSteps: Record<string, InstructionStep> =
  workInstructions;
