import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import LastSearchCard from '../components/LastSearchCard';
import FeaturedDestinations from '../components/FeaturedDestinations';
import { actions } from '../store/modules/hotels/reducer';
import { heroTitleText, heroSubtitle, defaultSearchParams, featuredDestinationsLimit, addDays } from '../constants';

export default function MainPage() {
  const dispatch = useDispatch();
  const destinations = useSelector(s => s.hotels.destinations);
  const lastSearch = useSelector(s => s.hotels.lastSearch);

  const featured = useMemo(() => destinations.slice(0, featuredDestinationsLimit), [destinations]);

  const triggerQuickSearch = (cityLabel) => {
    dispatch(actions.fetchHotels({ 
      destinationId: cityLabel, 
      checkIn: addDays(defaultSearchParams.daysOffset.checkIn), 
      checkOut: addDays(defaultSearchParams.daysOffset.checkOut), 
      adults: defaultSearchParams.adults, 
      children: defaultSearchParams.children 
    }));
  };

  const heroTitle = (
    <>
      {heroTitleText.split(' ').slice(0, -1).join(' ')} <Box component="span" sx={{ color: 'warning.main' }}>Booking</Box>
    </>
  );

  return (
    <Box>
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <LastSearchCard 
        lastSearch={lastSearch}
        onRepeatSearch={(search) => dispatch(actions.fetchHotels(search))}
      />

      <FeaturedDestinations 
        destinations={featured}
        onDestinationClick={triggerQuickSearch}
      />
    </Box>
  );
}
