import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loginId, setLoginId] = useState(null);
  const [userInfo, setUserInfo] = useState({
    _id:"",
    userName:"",
    companyName:"",
    totalCouponsGenerated: 0,
    totalCouponsUsed: 0,
    billing:0
  });
  const setUserId = (id) => {
    setLoginId(id);
  };

  return (
    <UserContext.Provider value={{ loginId, setUserId,userInfo,setUserInfo }}>
      {children} {console.log(userInfo)}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
