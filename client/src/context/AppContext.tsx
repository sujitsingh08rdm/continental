import { createContext, useEffect, useState } from "react";
import type { ChildrenInterface } from "../types/ChildrenInterface";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { hotelsData, roomsData } from "../assets/assets.js";
import ClientCatchError from "../utils/ClientCatchError.js";
import httpRequest from "../utils/httpRequest.js";
import toast from "react-hot-toast";

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
  const [owner, setOwner] = useState(null);
  const [hotelData, setHotelData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const checkUserLoggedInOrNot = async () => {
    try {
      const { data } = await httpRequest.get("/api/auth/is-auth");

      if (data.success) {
        if (data.user.role === "user") {
          setUser(true);
        }
        if (data.user.role === "owner") {
          setOwner(true);
        }
      }
    } catch (error) {
      ClientCatchError(error);
    }
  };

  const fetchHotelData = async () => {
    try {
      const { data } = await httpRequest.get("/api/hotel/get-all");
      if (data.success) {
        setHotelData(data.hotels);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      ClientCatchError(error);
    }
  };

  const fetchRoomData = async () => {
    try {
      const { data } = await httpRequest.get("/api/room/get-all");
      if (data.success) {
        setRoomData(data.rooms);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      ClientCatchError(error);
    }
  };

  useEffect(() => {
    checkUserLoggedInOrNot();
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
