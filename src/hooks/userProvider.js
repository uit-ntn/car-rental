import React, {
  createContext,
  useState
} from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('isLoggedIn')?.replace(/"/g, ''));

  const setUserIdValue = (id) => {
    console.log(id);
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: setUserIdValue }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
