import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const obj = localStorage.getItem("user");
    if (obj) {
      setUser(JSON.parse(obj));
    }
  }, []);

  return user;
}