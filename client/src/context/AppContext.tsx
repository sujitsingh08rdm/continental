import { createContext, useState } from "react";
import type { ChildrenInterface } from "../types/ChildrenInterface";
import { useNavigate, type NavigateFunction } from "react-router-dom";

interface AppContextInterface {
  navigate: NavigateFunction;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  owner: any;
  setOwner: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<AppContextInterface | null>(null);

const AppContextProvider = ({ children }: ChildrenInterface) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);

  const value: any = { navigate, owner, setOwner, user, setUser };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
