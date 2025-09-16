import React from 'react';
import { Typography, Box } from '@mui/material';
import FeatureGrid from '../components/FeatureGrid';
import ProcessStepper from '../components/ProcessStepper';
import TagCloud from '../components/TagCloud';
import FAQSection from '../components/FAQSection';
import NewsletterSubscription from '../components/NewsletterSubscription';
import { featuresData, steps, keyFeatures, faqs } from '../constants';

export default function AboutPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        About Our Booking Platform
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 780 }}>
        We help travelers find the right stay faster: transparent hotel data, instant filtering
        by destination, and a clean booking flow. Below you can see how the platform works and
        why users choose us for their trips.
      </Typography>

      <FeatureGrid features={featuresData} />

      <ProcessStepper steps={steps} />

      <TagCloud tags={keyFeatures} title="Key Features" />

      <FAQSection faqs={faqs} />

      <NewsletterSubscription />
    </Box>
  );
}
