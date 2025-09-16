import React from 'react';
import { Typography, Paper, Grid, Stack, Chip, Slider } from '@mui/material';

export default function FilterPanel({ 
  title = "Hotels",
  subtitle = "Browse filtered results. Use quick rating chips or slider.",
  quickRatings = [0, 2, 3, 4],
  minRating,
  onRatingChange,
  onQuickRatingClick
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Quick rating
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {quickRatings.map(r => (
              <Chip 
                key={r} 
                label={r === 0 ? 'All' : `${r}+`} 
                color={minRating === r ? 'warning' : 'default'} 
                size="small" 
                onClick={() => onQuickRatingClick(r)} 
              />
            ))}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Min Rating: {minRating}
          </Typography>
          <Slider 
            value={minRating} 
            min={0} 
            max={5} 
            step={0.5} 
            valueLabelDisplay="auto" 
            onChange={(_, v) => onRatingChange(v)} 
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
