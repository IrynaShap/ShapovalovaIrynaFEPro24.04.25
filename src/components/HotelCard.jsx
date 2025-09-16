import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack, Tooltip } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import StarIcon from '@mui/icons-material/Star';

export default function HotelCard({ hotel }) {
  const {
    name,
    address,
    city,
    state,
    country_code,
    hotel_rating,
    phone_number
  } = hotel;

  return (
    <Card
      variant="outlined"
      sx={{
        height: 260,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: (t) => t.shadows[6],
          borderColor: 'primary.light',
          transform: 'translateY(-2px)'
        },
        transition: 'all .25s',
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: .5 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere'
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 0 }}>
          {address}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {city}{state ? `, ${state}` : ''} · {country_code}
        </Typography>
        <Box sx={{ mt: 'auto' }} />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: .5 }}>
          {hotel_rating != null && (
            <Chip
              size="small"
              color={hotel_rating >= 4 ? 'success' : hotel_rating >= 3 ? 'primary' : 'default'}
              icon={<StarIcon style={{ fontSize: 16 }} />}
              label={hotel_rating}
              variant={hotel_rating >= 4 ? 'filled' : 'outlined'}
            />
          )}
          {phone_number && (
            <Tooltip title={phone_number}>
              <Chip size="small" icon={<PhoneIphoneIcon style={{ fontSize: 16 }} /> } label="Phone" variant="outlined" />
            </Tooltip>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
