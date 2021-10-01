import type { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";
import workInstructions from "./work-instructions.json";

export interface InstructionStep {
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: React.ReactNode[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
}

export interface WorkInstructionsSummary {
  title: string;
  description: string;
  numParts: number;
  timeToComplete: string;
  streamKey: string;
  workInstructions: Record<string, InstructionStep>
}


// export const streamKey = workInstructions.streamKey;

export const workInstructionsSummary: WorkInstructionsSummary = {
  title: workInstructions["title"],
  numParts: workInstructions["numParts"],
  description: workInstructions["description"],
  timeToComplete: workInstructions["timeToComplete"],
  streamKey: workInstructions.streamKey, 
  workInstructions: workInstructions["workInstructions"],
};
