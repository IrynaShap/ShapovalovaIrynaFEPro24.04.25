import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Grid } from '@mui/material';
import SearchForm from '../components/SearchForm';
import HotelCard from '../components/HotelCard';
import FilterPanel from '../components/FilterPanel';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { quickRatings } from '../constants';

export default function HotelsPage() {
  const hotels = useSelector((s) => s.hotels.list);
  const loading = useSelector((s) => s.hotels.loading);
  const [minRating, setMinRating] = useState(0);
  const filtered = useMemo(() => {
    if (!Array.isArray(hotels)) return [];
    return hotels.filter(h => (h.hotel_rating ?? 0) >= minRating);
  }, [hotels, minRating]);

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <SearchForm />
      </Box>
      <FilterPanel 
        quickRatings={quickRatings}
        minRating={minRating}
        onRatingChange={setMinRating}
        onQuickRatingClick={setMinRating}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (!filtered || filtered.length === 0) ? (
        <Typography color="text.secondary">No hotels found{minRating ? ' for selected rating' : ''}. Try adjusting filters.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map(h => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={h.id} width={'30%'}>
              <HotelCard hotel={h} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

