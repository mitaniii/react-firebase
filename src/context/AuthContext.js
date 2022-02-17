import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";


const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user,setUser] = useState("");
  const [lording, setLoading] = useState(true);
  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribed();
  }, []);

  return <AuthContext.provider value={value}>
         {!loading && children}
         </AuthContext.provider>;
}