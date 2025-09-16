import React from 'react';
import { Typography, Box, Chip } from '@mui/material';

export default function TagCloud({ tags, title, color = "primary", variant = "outlined" }) {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
        {tags.map(tag => (
          <Chip key={tag} label={tag} color={color} variant={variant} />
        ))}
      </Box>
    </>
  );
}
