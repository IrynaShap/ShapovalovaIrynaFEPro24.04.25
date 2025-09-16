export const addDays = (days) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

export const getDefaultDates = () => ({
  checkIn: addDays(1),
  checkOut: addDays(14)
});

export const validationMessages = {
  required: 'This field is required',
  minGuests: 'At least 1 guest is required',
  invalidDate: 'Please select a valid date'
};

export const skeletonConfig = {
  hotelCards: 6,
  height: 260,
  animation: 'wave'
};
