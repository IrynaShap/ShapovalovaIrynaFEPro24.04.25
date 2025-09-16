import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const iconMap = {
  Hotel: HotelIcon,
  Favorite: FavoriteIcon,
  Lock: LockIcon,
  SupportAgent: SupportAgentIcon
};

export function FeatureCard({ iconName, iconColor, title, description, icon }) {
  const IconComponent = icon ? null : iconMap[iconName];
  const displayIcon = icon || (IconComponent ? <IconComponent color={iconColor} /> : null);
  
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        {displayIcon}
        <Typography fontWeight={600}>{title}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </Paper>
  );
}

export default function FeatureGrid({ features, columns = { xs: 12, md: 6 } }) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {features.map((feature, index) => (
        <Grid size={columns} key={index} width={'45%'}>
          <FeatureCard {...feature} />
        </Grid>
      ))}
    </Grid>
  );
}
