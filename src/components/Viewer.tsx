/* @jsx jsx */ /** @jsxRuntime classic */ import { jsx } from "@emotion/react";
import { Button, ButtonGroup } from "@material-ui/core";
import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { TapEventDetails } from "@vertexvis/viewer";
import {
  JSX as ViewerJSX,
  VertexViewer,
  VertexViewerToolbar,
  VertexViewerViewCube,
} from "@vertexvis/viewer-react";
import React from "react";

import { StreamCredentials } from "../lib/env";

interface ViewerProps extends ViewerJSX.VertexViewer {
  readonly credentials: StreamCredentials;
  readonly sceneViewStateId?: string;
  readonly viewer: React.MutableRefObject<HTMLVertexViewerElement | null>;
}

type ViewerComponentType = React.ComponentType<
  ViewerProps & React.RefAttributes<HTMLVertexViewerElement>
>;

type HOCViewerProps = React.RefAttributes<HTMLVertexViewerElement>;

export const Viewer = onTap(UnwrappedViewer);

function UnwrappedViewer({
  credentials,
  sceneViewStateId,
  viewer,
  ...props
}: ViewerProps): JSX.Element {
  const AnimationDurationMs = 1500;

  async function fitAll(): Promise<void> {
    (await viewer.current?.scene())
      ?.camera()
      .viewAll()
      .render({ animation: { milliseconds: AnimationDurationMs } });
  }

  React.useEffect(() => {
    async function loadSceneViewState(): Promise<void> {
      console.log(
        "loadSceneViewState",
        viewer.current == null,
        sceneViewStateId
      );
      if (viewer.current == null || !sceneViewStateId) return;

      await (
        await viewer.current.scene()
      ).applySceneViewState(sceneViewStateId);
      console.log("Finished loading", sceneViewStateId);
    }

    loadSceneViewState();
  }, [sceneViewStateId, viewer]);

  return (
    <VertexViewer
      css={{ height: "100%", width: "100%" }}
      clientId={credentials.clientId}
      ref={viewer}
      src={`urn:vertexvis:stream-key:${credentials.streamKey}`}
      {...props}
    >
      <VertexViewerToolbar placement="top-right">
        <VertexViewerViewCube
          animationDuration={AnimationDurationMs}
          viewer={viewer.current ?? undefined}
        />
      </VertexViewerToolbar>
      <VertexViewerToolbar placement="bottom-center">
        <ButtonGroup sx={{ mb: 2 }} variant="contained">
          <Button color="inherit" onClick={() => fitAll()}>
            Fit all
          </Button>
        </ButtonGroup>
      </VertexViewerToolbar>
    </VertexViewer>
  );
}

interface OnSelectProps extends HOCViewerProps {
  readonly onSelect: (
    detail: TapEventDetails,
    hit?: vertexvis.protobuf.stream.IHit
  ) => Promise<void>;
}

function onTap<P extends ViewerProps>(
  WrappedViewer: ViewerComponentType
): React.FunctionComponent<P & OnSelectProps> {
  return function Component({ viewer, onSelect, ...props }: P & OnSelectProps) {
    return (
      <WrappedViewer
        viewer={viewer}
        {...props}
        onTap={async (e) => {
          if (props.onTap) props.onTap(e);

          if (!e.defaultPrevented) {
            const scene = await viewer.current?.scene();
            const raycaster = scene?.raycaster();

            if (raycaster != null) {
              const res = await raycaster.hitItems(e.detail.position, {
                includeMetadata: true,
              });
              const hit = (res?.hits ?? [])[0];
              await onSelect(e.detail, hit);
            }
          }
        }}
      />
    );
  };
}
