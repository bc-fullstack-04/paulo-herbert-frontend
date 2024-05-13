import { UserModel } from "@/models/UserModel";
import { album_api, user_api } from "@/services/apiService";
import { createContext, useCallback, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

interface AuthContextModel extends UserModel {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [userData, setUserData] = useState<UserModel>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData: UserModel = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
    if(userData.id) {
      setIsAuthenticated(true);
      setUserData(userData);
      const userToken:string = JSON.parse(localStorage.getItem('@Auth.Token') || "{}");
      user_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
      album_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
    }
    //Logout();
  }, []);

  const Login = useCallback(async (email: string, password: string) => {
    console.log("login func")
    const respAuth = await user_api.post('/users/auth', {email, password});

    if(respAuth instanceof Error) {
      return respAuth.message;
    }
 
    user_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    album_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    const respUserInfo = await user_api.get(`/users/${respAuth.data.id}`);

    if(respUserInfo instanceof Error) {
      return respUserInfo.message;
    }

    localStorage.setItem('@Auth.Data', JSON.stringify(respUserInfo.data));
    localStorage.setItem('@Auth.Token', JSON.stringify(respAuth.data.token));
    setUserData(respUserInfo.data);
    setIsAuthenticated(true);
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem('@Auth.Data');
    localStorage.removeItem('@Auth.Token');
    setUserData(undefined);
    setIsAuthenticated(false);
    return navigate("/");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, ...userData, login: Login, logout: Logout}}>
      {children}
    </AuthContext.Provider>
  );
}