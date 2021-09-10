import { NoStepActive } from "@components/NoStepActive";
import { InstructionStep } from "@lib/work-instructions";
import { Typography } from "@material-ui/core";
import React from "react";

interface Props {
  readonly onClose: () => void;
  readonly onShow: (name: string, ids: string[]) => void;
  readonly step?: InstructionStep;
}

export function Parts({ onClose, onShow, step }: Props): JSX.Element {
  function NoContent(): JSX.Element {
    return step == null ? (
      <NoStepActive />
    ) : (
      <Typography sx={{ mb: 2 }}>No parts provided.</Typography>
    );
  }

  return <NoContent />;
}
