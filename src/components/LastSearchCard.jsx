import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

export default function LastSearchCard({ lastSearch, onRepeatSearch }) {
  if (!lastSearch || !lastSearch.destinationId) return null;

  return (
    <Card sx={{ mb: 4 }} variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>Last Search</Typography>
        <Typography variant="body2" color="text.secondary">
          {lastSearch.destinationId} · {lastSearch.checkIn} → {lastSearch.checkOut} · {lastSearch.adults} adult(s)
          {Number(lastSearch.children) > 0 ? ` · ${lastSearch.children} child(ren)` : ''}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button size="small" variant="contained" onClick={() => onRepeatSearch(lastSearch)}>
            Repeat Search
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
