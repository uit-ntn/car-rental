import { useState } from 'react';

function useValidation() {
  const [isValid, setIsValid] = useState(true);

  const validate = (value) => {
    // Thực hiện kiểm tra hợp lệ ở đây
    setIsValid(/* Kết quả của kiểm tra */);
  };

  return { isValid, validate };
}
