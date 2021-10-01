import { ContentHeader } from "@components/ContentHeader";
import {
  InstructionStep,
  WorkInstructionsSummary,
} from "@lib/work-instructions";

import { Box, Button, List, Typography } from "@material-ui/core";
import {
  MapOutlined,
  TimerOutlined,
  WidgetsOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";

interface Props {
  readonly onBeginAssembly: () => void;
  readonly onClose: () => void;
  readonly step?: InstructionStep;
  readonly wi: WorkInstructionsSummary;

}

export function Instructions({
  onBeginAssembly,
  onClose,
  step,
  wi,
}: Props): JSX.Element {
  const numSteps = Object.keys(wi?.workInstructions || []).length;

  function NoContent(): JSX.Element {
    return step == null && wi != null ? (
      <>
        <ContentHeader
          onClose={onClose}
          title={wi.title}
        />
        <Typography sx={{ mb: 6 }}>
          {wi.description}
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <MapOutlined sx={{ mr: 1 }} />
          <Typography>{`${numSteps} steps`}</Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <WidgetsOutlined sx={{ mr: 1 }} />
          <Typography>{wi.numParts} parts</Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 6 }}>
          <TimerOutlined sx={{ mr: 1 }} />
          <Typography>
            {wi.timeToComplete} to complete
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => onBeginAssembly()} variant="contained">
            Begin Assembly
          </Button>
        </Box>
      </>
    ) : (
      <></>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return step == null ? (
    <NoContent />
  ) : (
    <>
      <ContentHeader onClose={onClose} title={`${stepNum} of ${numSteps}`} />
      {step.title && (
        <Typography sx={{ fontWeight: "fontWeightBold", mb: 3 }}>
          {step?.title}
        </Typography>
      )}
      {step.instructions != null ? (
        <List>
          {step.instructions.map((t, i) => (
            <Typography key={i} sx={{ mb: 2 }}>
              {`${i + 1}. `}
              {t}
            </Typography>
          ))}
        </List>
      ) : (
        <NoContent />
      )}
    </>
  );
}
