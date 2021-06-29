import { Link } from "@material-ui/core";
import { Quaternion, Vector3 } from "@vertexvis/geometry";
import { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

interface Arrow {
  readonly position: Vector3.Vector3;
  readonly rotation: Quaternion.Quaternion;
  readonly type: "up" | "down";
}

interface Part {
  readonly name: string;
  readonly quantity: number;
  readonly sceneItemSuppliedIds: string[];
}

export interface InstructionStep {
  readonly arrows?: Arrow[];
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: (onShow: (ids: string[]) => void) => React.ReactNode[];
  readonly parts: Part[];
  readonly sceneItemsVisible: string[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
}

const step1Cam: FrameCamera.FrameCamera = {
  position: {
    x: -955.7966918945312,
    y: 520.9080200195312,
    z: 368.5772399902344,
  },
  lookAt: {
    x: -1377.415771484375,
    y: 794.2061767578125,
    z: 236.43722534179688,
  },
  up: {
    x: -0.2708650827407837,
    y: 0.0470057874917984,
    z: 0.9614689350128174,
  },
};

const step2Cam: FrameCamera.FrameCamera = {
  position: {
    x: -901.5206298828125,
    y: 660.30810546875,
    z: 396.15740966796875,
  },
  lookAt: {
    x: -1377.415771484375,
    y: 794.2061767578125,
    z: 236.43722534179688,
  },
  up: {
    x: -0.31933844089508057,
    y: -0.0046013714745640755,
    z: 0.9476295113563538,
  },
};

const step3Cam: FrameCamera.FrameCamera = {
  position: {
    x: -1723.2679443359375,
    y: 1058.5960693359375,
    z: 279.37823486328125,
  },
  lookAt: {
    x: -1388.18310546875,
    y: 770.7772827148438,
    z: 223.43975830078125,
  },
  up: {
    x: 0.12238356471061707,
    y: -0.05016382411122322,
    z: 0.9912142753601074,
  },
};

const step4Cam: FrameCamera.FrameCamera = {
  position: {
    x: -1329.5069580078125,
    y: 561.3935546875,
    z: 451.5056457519531,
  },
  lookAt: {
    x: -1398.9622802734375,
    y: 714.4110717773438,
    z: 303.1302795410156,
  },
  up: {
    x: -0.7405996918678284,
    y: 0.2632957994937897,
    z: 0.6182129979133606,
  },
};

const ControlArmRlls = "308600";
const FenderFrame = "312220";
const FenderRearStreet = "312240";
const HoweBallJoints = ["312200", "312210"];
const M10x35Bolts = ["312100", "312110", "312120", "312130", "312140"];
const M12HeimMhmr12T = "300820";
const SSSpindle = "312230";
const ToeLink = "308640";
const WheelAxle = "308390";
const WheelMechHousing = "307750";
const Z06InnerHub = "312080";

const step2SceneItemsVisible = [
  M12HeimMhmr12T,
  Z06InnerHub,
  ...HoweBallJoints,
  SSSpindle,
  WheelMechHousing,
  WheelAxle,
  ControlArmRlls,
  ToeLink,
];

export const InstructionSteps: Record<string, InstructionStep> = {
  "step-1": {
    arrows: [
      {
        position: { x: -1400, y: 740, z: 221 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "up",
      },
      {
        position: { x: -1298, y: 740, z: 229 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "up",
      },
      {
        position: { x: -1340, y: 740, z: 138 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "up",
      },
    ],
    camera: step1Cam,
    instructions: (onShow: (ids: string[]) => void) => [
      <>
        Install three (3) M12x1.25 mm torx head bolts in the{" "}
        <Link onClick={() => onShow([Z06InnerHub])}>Z06 inner hub</Link> with
        Loctite® Threadlocker 271™.
      </>,
      <>Using a T55 socket, torque the bolts to 75 ft/lbs.</>,
    ],
    parts: [
      {
        name: "Z06 inner hub",
        quantity: 1,
        sceneItemSuppliedIds: [Z06InnerHub],
      },
      {
        name: "SS Spindle",
        quantity: 1,
        sceneItemSuppliedIds: [SSSpindle],
      },
    ],
    sceneItemsVisible: [Z06InnerHub, SSSpindle],
    sceneViewStateId: "f4ec5c6e-ed3a-4806-8d67-240f93378cda",
    step: 1,
    title: "Install the inner hub on the spindle",
  },
  "step-2": {
    arrows: [
      {
        position: { x: -1360, y: 685, z: 390 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0.05 },
        type: "up",
      },
      {
        position: { x: -1334, y: 730, z: 130 },
        rotation: { w: 0.7071, x: 0, y: 0.8, z: 0 },
        type: "up",
      },
    ],
    camera: step2Cam,
    instructions: (onShow: (ids: string[]) => void) => [
      <>
        Clean the ID of the{" "}
        <Link onClick={() => onShow([SSSpindle])}>spindle</Link> and the OD of
        the <Link onClick={() => onShow(HoweBallJoints)}>ball joints</Link> with
        brake cleaner and degreaser.
      </>,
      <>Wipe clean with a lint free shop towel.</>,
      <>
        Install the washers and castle nuts on the{" "}
        <Link onClick={() => onShow(HoweBallJoints)}>ball joints</Link>.
      </>,
      <>Torque the castle nuts to 30 ft/lbs and turn it an additional 140°.</>,
      <>
        Ensure the castle nut notch lines up with the hole in the{" "}
        <Link onClick={() => onShow(HoweBallJoints)}>ball joints</Link> and
        install a cotter pin.
      </>,
    ],
    parts: [
      {
        name: "Z06 inner hub",
        quantity: 1,
        sceneItemSuppliedIds: [Z06InnerHub],
      },
      {
        name: "Howe ball joint",
        quantity: 2,
        sceneItemSuppliedIds: HoweBallJoints,
      },
      { name: "SS Spindle", quantity: 1, sceneItemSuppliedIds: [SSSpindle] },
    ],
    sceneItemsVisible: step2SceneItemsVisible,
    sceneViewStateId: "cc79089a-f354-4074-9296-91bbad0aa696",
    step: 2,
    title: "Install the spindle on the ball joints",
  },
  "step-3": {
    arrows: [
      {
        position: { x: -1490, y: 860, z: 185 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "down",
      },
    ],
    camera: step3Cam,
    instructions: () => [],
    parts: [
      {
        name: "M12 heim MHMR12T",
        quantity: 1,
        sceneItemSuppliedIds: [M12HeimMhmr12T],
      },
      { name: "Toe Link", quantity: 1, sceneItemSuppliedIds: [ToeLink] },
    ],
    sceneItemsVisible: step2SceneItemsVisible,
    sceneViewStateId: "62b1fde2-a78b-49aa-82cb-e833c4af9347",
    step: 3,
    title: "Install the stabilizer arm",
  },
  "step-4": {
    arrows: [
      {
        position: { x: -1459, y: 650, z: 320 },
        rotation: {
          w: 0,
          x: -0.000016310950741171837,
          y: -0.9998411536216736,
          z: -0.01782582886517048,
        },
        type: "up",
      },
    ],
    camera: step4Cam,
    instructions: (onShow: (ids: string[]) => void) => [
      <>
        Torque the <Link onClick={() => onShow(M10x35Bolts)}>M10x35 bolts</Link>{" "}
        to 45 ft/lbs.
      </>,
    ],
    parts: [
      {
        name: "M10x35",
        quantity: 5,
        sceneItemSuppliedIds: M10x35Bolts,
      },
      {
        name: "Fender frame",
        quantity: 1,
        sceneItemSuppliedIds: [FenderFrame],
      },
      {
        name: "Fender rear",
        quantity: 1,
        sceneItemSuppliedIds: [FenderRearStreet],
      },
    ],
    sceneItemsVisible: [
      ...step2SceneItemsVisible,
      ...M10x35Bolts,
      FenderFrame,
      FenderRearStreet,
    ],
    sceneViewStateId: "ebfd9db7-0e40-4efb-b71e-025311bd3fc1",
    step: 4,
    title: "Install the fender frame",
  },
};
