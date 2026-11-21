import { createContext, useEffect, useState } from "react";
import type { ChildrenInterface } from "../types/ChildrenInterface";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { hotelsData, roomsData } from "../assets/assets.js";

interface AppContextInterface {
  navigate: NavigateFunction;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  owner: any;
  setOwner: React.Dispatch<React.SetStateAction<any>>;
  hotelData: any;
  setHotelData: React.Dispatch<React.SetStateAction<any>>;
  roomData: any;
  setRoomData: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<AppContextInterface | null>(null);

const AppContextProvider = ({ children }: ChildrenInterface) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(true);
  const [hotelData, setHotelData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const fetchHotelData = () => {
    setHotelData(hotelsData);
  };

  const fetchRoomData = () => {
    setRoomData(roomsData);
  };

  useEffect(() => {
    fetchHotelData();
    fetchRoomData();
  }, []);

  const value: any = {
    navigate,
    owner,
    setOwner,
    user,
    setUser,
    hotelData,
    roomData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
