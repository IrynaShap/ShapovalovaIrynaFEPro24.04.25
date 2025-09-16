import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Chip, Divider } from '@mui/material';

export default function NewsletterSubscription({ 
  title = "Stay in the loop",
  subtitle = "Get occasional product updates & travel tips."
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail('');
  };

  return (
    <>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{subtitle}</Typography>
      <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 6 }}>
        <TextField
          value={email}
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          sx={{ minWidth: 260 }}
        />
        <Button type="submit" variant="contained" disabled={!email || subscribed}>
          Subscribe
        </Button>
        {subscribed && <Chip color="success" label="Subscribed!" />}
      </Box>
    </>
  );
}
