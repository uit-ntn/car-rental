import Cookies from "js-cookie";
const BASE_URL = 'https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user';


// Hàm kiểm tra username có tồn tại hay không
export const checkUsernameExists = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}?username=${username}`);
    const data = await response.json();
    return data.length > 0;
  } catch (error) {
    console.error('Lỗi kiểm tra sự tồn tại của tên người dùng:', error);
    return false;
  }
};


// Hàm kiểm tra email có tồn tại không
export const checkEmailExists = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}?email=${email}`);
    const data = await response.json();
    return data.length > 0;
  } catch (error) {
    console.error('Lỗi kiểm tra sự tồn tại của email:', error);
    return false;
  }
};

export const registerUser = async (userData) => {
  try {
    // Kiểm tra xem tên người dùng đã tồn tại chưa
    const isUsernameExists = await checkUsernameExists(userData.username);
    if (isUsernameExists) {
      throw new Error('Tên người dùng đã tồn tại');
    }

    // Kiểm tra xem email đã tồn tại chưa
    const isEmailExists = await checkEmailExists(userData.email);
    if (isEmailExists) {
      throw new Error('Email đã được sử dụng');
    }

    // Tiến hành đăng ký nếu tên người dùng và email là duy nhất
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const registrationData = await response.json();

    if (!response.ok) {
      throw new Error('Lỗi đăng ký người dùng:', registrationData.message);
    }

    // Lưu ID vào cookies sau khi đăng ký thành công
    Cookies.set("userId", registrationData.id);

    return registrationData;
  } catch (error) {
    console.error('Lỗi đăng ký người dùng:', error);
    throw new Error('Lỗi đăng ký người dùng.');
  }
};


// hàm đăng nhập
export const loginUser = async (requestData) => {
  try {
    const url = `${BASE_URL}?username=${requestData.username}&password=${requestData.password}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();

      // Lưu ID và username vào cookies sau khi đăng nhập thành công
      Cookies.set("userId", userData.userId);
      Cookies.set("username", userData.username, { sameSite: 'strict', secure: true });

      return true;
    } else {
      const errorData = await response.json();
      throw new Error(`Lỗi đăng nhập: ${errorData.message}`);
    }
  } catch (error) {
    throw new Error(`Lỗi kết nối: ${error.message}`);
  }
};

export const recoverPassword = async (recoveryData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recoveryData),
    });

    if (response.ok) {
      const recoveredPassword = await response.json();
      return recoveredPassword.password;
    } else {
      const errorData = await response.json();
      throw new Error(`Lỗi yêu cầu lấy lại mật khẩu: ${errorData.message}`);
    }
  } catch (error) {
    throw new Error(`Lỗi kết nối: ${error.message}`);
  }
};