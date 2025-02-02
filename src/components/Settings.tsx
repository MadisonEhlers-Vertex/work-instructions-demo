import { ContentHeader } from "@components/ContentHeader";
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";

export interface SettingsProps {
  ghosted: boolean;
  onGhostToggle: (checked: boolean) => void;
}

interface Props {
  readonly onClose: () => void;
  readonly settings: SettingsProps;
}

export function Settings({ onClose, settings }: Props): JSX.Element {
  return (
    <>
      <ContentHeader onClose={onClose} title="Settings" />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={settings.ghosted}
              onChange={(e) => settings.onGhostToggle(e.target.checked)}
            />
          }
          label="Ghosted geometry"
        />
      </FormGroup>
    </>
  );
}
