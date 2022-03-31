import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user"))
      setUserInfo(JSON.parse(localStorage.getItem("user"))[0]);
  }, []);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return { accessToken, userInfo };
};
