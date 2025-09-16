import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Grid, MenuItem, TextField, Button, Paper, Stack } from '@mui/material';
import { actions } from '../store/modules/hotels/reducer';
import { getDefaultDates, validationMessages } from '../constants';

const required = (value) => (value ? undefined : validationMessages.required);

export default function SearchForm() {
  const dispatch = useDispatch();
  const destinations = useSelector((s) => s.hotels.destinations);
  const loading = useSelector((s) => s.hotels.loading);
  const lastSearch = useSelector((s) => s.hotels.lastSearch);

  const defaultDates = getDefaultDates();
  const defaultValues = {
    checkIn: defaultDates.checkIn,
    checkOut: defaultDates.checkOut,
    adults: 1,
    children: 0,
    ...lastSearch
  };

  useEffect(() => {
    dispatch(actions.fetchDestinations());
  }, [dispatch]);

  const onSubmit = (values) => {
    dispatch(actions.fetchHotels(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={defaultValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: (t) => t.palette.mode === 'light' ? 'background.paper' : 'background.default' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: { xs: 'wrap', lg: 'nowrap' } }}>
            <Field name="destinationId" validate={required}>
              {({ input, meta }) => (
                <TextField
                  {...input}
                  select
                  label="Destination"
                  sx={{ minWidth: 200, flex: { xs: '1 1 240px', lg: '2' } }}
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                >
                  {destinations.map((d) => (
                    <MenuItem key={d.id} value={d.label}>{d.label}</MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
            <Field name="checkIn" validate={required}>
              {({ input, meta }) => (
                <TextField 
                  {...input} 
                  type="date" 
                  label="Check in" 
                  InputLabelProps={{ shrink: true }} 
                  error={meta.touched && !!meta.error} 
                  helperText={meta.touched && meta.error}
                  sx={{ flex: { xs: '1 1 150px', lg: '1' } }}
                />
              )}
            </Field>
            <Field name="checkOut" validate={required}>
              {({ input, meta }) => (
                <TextField 
                  {...input} 
                  type="date" 
                  label="Check out" 
                  InputLabelProps={{ shrink: true }} 
                  error={meta.touched && !!meta.error} 
                  helperText={meta.touched && meta.error}
                  sx={{ flex: { xs: '1 1 150px', lg: '1' } }}
                />
              )}
            </Field>
            <Field name="adults" validate={required}>
              {({ input, meta }) => (
                <TextField 
                  {...input} 
                  type="number" 
                  label="Adults" 
                  inputProps={{ min: 1 }} 
                  error={meta.touched && !!meta.error} 
                  helperText={meta.touched && meta.error}
                  sx={{ flex: { xs: '1 1 120px', lg: '0 0 120px' } }}
                />
              )}
            </Field>
            <Field name="children" initialValue={0}>
              {({ input }) => (
                <TextField 
                  {...input} 
                  type="number" 
                  label="Children" 
                  inputProps={{ min: 0 }}
                  sx={{ flex: { xs: '1 1 120px', lg: '0 0 120px' } }}
                />
              )}
            </Field>
            <Button 
              type="submit" 
              variant="contained" 
              color="warning" 
              disabled={loading} 
              sx={{ height: '56px', flex: { xs: '1 1 120px', lg: '0 0 120px' } }}
            >
              Search
            </Button>
            </Stack>
          </Paper>
        </form>
      )}
    />
  );
}
