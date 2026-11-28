import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Loader = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { navigate } = context;
  const { nextUrl } = useParams();

  console.log(nextUrl, "next url trigger");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, [nextUrl]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full w-24 h-24 border-4 border-gray-300 border-t-indigo-600"></div>
    </div>
  );
};

export default Loader;
