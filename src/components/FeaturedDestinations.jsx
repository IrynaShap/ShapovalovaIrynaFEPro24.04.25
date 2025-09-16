import React from 'react';
import { Typography, Box, Chip } from '@mui/material';

export default function FeaturedDestinations({ destinations, onDestinationClick, title = "Featured Destinations" }) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {destinations.map(destination => (
          <Chip 
            key={destination.id} 
            label={destination.label} 
            onClick={() => onDestinationClick(destination.label)} 
            clickable 
            color="primary" 
            variant="outlined" 
          />
        ))}
      </Box>
    </Box>
  );
}
