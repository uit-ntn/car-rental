const API_URL = 'https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car';

// Hàm lấy danh sách xe từ server
const getCars = () => {
  return fetch(`${API_URL}/cars`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

// Hàm đặt xe thông qua server
const rentCar = (carId, rentalDays) => {
  return fetch(`${API_URL}/rent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ carId, rentalDays }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

export { getCars, rentCar };
