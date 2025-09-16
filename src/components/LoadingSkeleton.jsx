import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import { skeletonConfig } from '../constants';

export default function LoadingSkeleton({ 
  count = skeletonConfig.hotelCards, 
  height = skeletonConfig.height, 
  animation = skeletonConfig.animation,
  columns = { xs: 12, sm: 6, md: 4 } 
}) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid size={columns} key={i}>
          <Skeleton variant="rounded" height={height} animation={animation} />
        </Grid>
      ))}
    </Grid>
  );
}
