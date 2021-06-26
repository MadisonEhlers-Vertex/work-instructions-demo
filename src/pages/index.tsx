import { BottomDrawer } from "@components/BottomDrawer";
import { Header } from "@components/Header";
import { Layout } from "@components/Layout";
import { ReportIssueDialog } from "@components/ReportIssueDialog";
import { Content, RightDrawer } from "@components/RightDrawer";
import { Viewer } from "@components/Viewer";
import {
  createSceneViewState,
  initializeScene,
  renderPartRevision,
  RenderPartRevisionReq,
} from "@lib/authoring";
import { Config, Configuration, Credentials } from "@lib/config";
import {
  flyTo,
  handleHit as onSelect,
  selectBySuppliedIds,
} from "@lib/scene-items";
import { useViewer } from "@lib/viewer";
import { InstructionStep, InstructionSteps } from "@lib/work-instructions";
import { Snackbar } from "@material-ui/core";
import { delay } from "@vertexvis/api-client-node";
import React from "react";

export const getServerSideProps = (): Record<string, Configuration> => {
  return {
    props: { authoring: Config.authoring, vertexEnv: Config.vertexEnv },
  };
};

export default function Home({
  authoring,
  vertexEnv,
}: Configuration): JSX.Element {
  const viewer = useViewer();

  const [activeStep, setActiveStep] = React.useState<{
    num: number;
    step: InstructionStep | undefined;
  }>({ num: -1, step: undefined });
  const [sceneViewId, setSceneViewId] = React.useState<string | undefined>(
    undefined
  );
  const [ready, setReady] = React.useState(false);
  const [rightDrawerContent, setRightDrawerContent] = React.useState<
    Content | undefined
  >("instructions");
  const [ghosted, setGhosted] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<RenderPartRevisionReq>({});

  const stepIds = Object.keys(InstructionSteps);

  async function onSceneReady() {
    const v = viewer.ref.current;
    if (v == null) return;

    const scene = await v.scene();
    if (scene == null) return;

    console.debug("sceneViewId", scene.sceneViewId);
    setReady(true);
    setSceneViewId(scene.sceneViewId);
    // if (authoring) await initializeScene({ viewer: v });
  }

  async function onInstructionStepSelected(num: number): Promise<void> {
    if (!ready) return;

    const step = InstructionSteps[stepIds[num]];
    setReady(false);
    function onComplete() {
      delay(500).then(() => {
        setActiveStep({ num, step });
        setReady(true);
      });
    }

    const res = await flyTo({
      camera: step?.camera,
      viewer: viewer.ref.current,
    });
    res ? res.onAnimationCompleted.on(onComplete) : onComplete();
  }

  function handleBeginAssembly() {
    const num = 0;
    setActiveStep({ num, step: InstructionSteps[stepIds[num]] });
  }

  return (
    <Layout
      bottomDrawer={
        <BottomDrawer
          activeStep={activeStep.num}
          onSelect={onInstructionStepSelected}
          ready={ready}
          stepIds={stepIds}
        />
      }
      header={
        authoring && (
          <Header
            onCreateSceneViewState={(name) =>
              createSceneViewState({ name, sceneViewId })
            }
            onRenderPartRevision={() => renderPartRevision(selected)}
          />
        )
      }
      main={
        viewer.isReady && (
          <Viewer
            configEnv={vertexEnv}
            credentials={Credentials}
            onClick={(button) => {
              if (
                button === "settings" ||
                button === "instructions" ||
                button === "parts"
              ) {
                setRightDrawerContent(button);
              } else if (button === "issue") {
                setDialogOpen(true);
              }
            }}
            onSceneReady={onSceneReady}
            onSelect={async (detail, hit) => {
              console.debug(
                `${hit?.itemId?.hex},${hit?.itemSuppliedId?.value},${
                  hit?.metadata?.partName
                },${JSON.stringify(hit?.hitNormal)} ${JSON.stringify(
                  hit?.hitPoint
                )}`
              );
              setSelected({
                part: {
                  name: hit?.metadata?.partName ?? undefined,
                  revisionId: hit?.partRevisionId?.hex ?? undefined,
                },
                sceneItemSuppliedId: hit?.itemSuppliedId?.value ?? undefined,
              });
              await onSelect({ detail, hit, viewer: viewer.ref.current });
            }}
            instructionStep={activeStep.step}
            streamAttributes={{
              experimentalGhosting: {
                enabled: { value: ghosted },
                opacity: { value: 0.7 },
              },
            }}
            viewer={viewer.ref}
          />
        )
      }
      rightDrawer={
        <RightDrawer
          content={rightDrawerContent}
          instructionStep={activeStep.step}
          onBeginAssembly={handleBeginAssembly}
          onClose={() => setRightDrawerContent(undefined)}
          onShow={(ids) =>
            selectBySuppliedIds({ ids, viewer: viewer.ref.current })
          }
          settings={{ ghosted, onGhostToggle: setGhosted }}
        />
      }
    >
      {dialogOpen && (
        <ReportIssueDialog
          onClose={() => setDialogOpen(false)}
          onConfirm={() => {
            setSnackOpen(true);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          part={selected.part}
        />
      )}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={(_e: React.SyntheticEvent, reason?: string) => {
          if (reason === "clickaway") return;

          setSnackOpen(false);
        }}
        message="Issue reported successfully."
      />
    </Layout>
  );
}
