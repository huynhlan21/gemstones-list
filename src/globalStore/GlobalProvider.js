import { useEffect, useState } from "react";

import GlobalContext from "./GlobalContext";
import { setupServer } from "../utils/fakeApi"
import * as services from "../services"

// fake api
setupServer()

function GlobalProvider({ children }) {
  const [gemstones, setGemstones] = useState([]);
  const [pagination, setPagination] = useState({})
  const [searchText, setSearchText] = useState("")
  const [sorting, setSorting] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true)
      const {data, currentPage, totalPage, itemPerPage, totalItem, itemPerPageOption} = await services.loadingGemstoneList()

      setGemstones(data)
      setPagination({
        currentPage,
        totalPage,
        itemPerPage,
        totalItem,
        itemPerPageOption
      })

      setIsLoading(false)
    }

    fetchApi()
  }, [])

  return (
    <GlobalContext.Provider value={{
      gemstones, 
      setGemstones, 
      pagination, 
      setPagination, 
      searchText, 
      setSearchText,
      sorting, 
      setSorting,
      isLoading
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;