import { useContext } from "react";
import GlobalContext from "./GlobalContext";

export const useGlobalStore = () => {
  const {
    gemstones, 
    setGemstones, 
    pagination, 
    setPagination, 
    searchText, 
    setSearchText,
    sorting, 
    setSorting,
    isLoading
  } = useContext(GlobalContext);

  return { 
    gemstones, 
    setGemstones, 
    pagination, 
    setPagination, 
    searchText, 
    setSearchText,
    sorting, 
    setSorting,
    isLoading
  };
};
