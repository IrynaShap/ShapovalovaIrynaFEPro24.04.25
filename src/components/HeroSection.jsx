import React from 'react';
import { Typography, Box, Paper, Stack } from '@mui/material';
import SearchForm from './SearchForm';

export default function HeroSection({ 
  title, 
  subtitle, 
  showSearchForm = true 
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        background: (t) => t.palette.mode === 'light'
          ? 'linear-gradient(135deg, #fff 0%, #f5f9ff 60%, #e8f3ff 100%)'
          : 'linear-gradient(135deg, #1e1e1e 0%, #252a32 60%, #2e3742 100%)',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: (t) => t.palette.mode === 'light'
            ? 'radial-gradient(circle at 80% 20%, rgba(25,118,210,0.15), transparent 60%)'
            : 'radial-gradient(circle at 80% 20%, rgba(144,202,249,0.15), transparent 60%)'
        }
      }}
    >
      <Stack spacing={2} maxWidth={680}>
        <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.1 }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight={400}>
          {subtitle}
        </Typography>
      </Stack>
      {showSearchForm && (
        <Box sx={{ mt: 4 }}>
          <SearchForm />
        </Box>
      )}
    </Paper>
  );
}
