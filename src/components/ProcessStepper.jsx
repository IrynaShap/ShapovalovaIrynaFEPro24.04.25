import React from 'react';
import { Typography, Stepper, Step, StepLabel } from '@mui/material';

export default function ProcessStepper({ steps, activeStep = steps.length - 1, title = "How It Works" }) {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
