
const baseBookingAPI = "";



const booking = {
  submitBooking: (bookingData) => fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  }).then(response => response.json()),
  getBookingHistory: (userId) => fetch(`/api/bookings/${userId}`).then(response => response.json()),
};

export default bookingApi;