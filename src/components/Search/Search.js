import { useEffect, useState, memo } from "react"

import { FormItem, StyledButton } from "../Styles"
import { Wrapper, StyledSearchText } from "./Search.styled"
import { useGlobalStore } from "../../globalStore/useGlobalStore";
import { fetchSearchApi } from "../../utils/common";
import Popup from "../Popup"

function Search () {
    const globalStates = useGlobalStore();
    const { pagination, searchText, setSearchText, setSorting} = globalStates;
    const [ inputText, setInputText ] = useState("")
    const [ isShowSearchText, setIsShowSearchText ] = useState(false)
    const [ isSearching, setIsSearching ] = useState(false)

    const handleSearchTextChange = (key, value) => {
        if (isSearching) return 
        setInputText(value)
    }

    const handleSearch = () => {
        setIsSearching(true)
        setSorting({})

        const fetchApi = async () => {
            await fetchSearchApi(
                1, 
                pagination.itemPerPageOption.includes(pagination.itemPerPage) ? pagination.itemPerPage : pagination.itemPerPageOption[0], 
                inputText.trim().toLowerCase(), 
                null, 
                globalStates
            )

            setSearchText(inputText.trim().toLowerCase())
            
            if (inputText.trim()) {
                setIsShowSearchText(true)
            } else {
                setIsShowSearchText(false)
            }

            setIsSearching(false)
        }
        
        fetchApi()
    }

    const handleClearSearch = () => {
        const fetchApi = async () => {
            await fetchSearchApi(1, null, "", {}, globalStates)

            setSearchText("")
            setInputText("")
            setSorting({})
        }
      
        fetchApi()
    }

    useEffect(() => {
        if (searchText) {
            setIsShowSearchText(true)
        } else {
            setIsShowSearchText(false)
        }
    }, [searchText])

    return (
        <Wrapper>
            <FormItem 
                type="search"
                size="small"
                width="30%"
                onUserInput={handleSearchTextChange}
                onEnter={handleSearch}
                inputText={inputText}
                clearSearch={handleClearSearch}
            />

            <StyledButton 
                title="Search" 
                sx={{marginLeft: 2}}
                onClick={handleSearch}
                disabled={isSearching}
            />

            {isShowSearchText ? <StyledSearchText error={pagination.totalItem}>{`Search result for "${searchText}":  ${pagination.totalItem} results`}</StyledSearchText> : ""}

            {isSearching && 
                <Popup type="Loading" title="Searching" /> }
        </Wrapper>
    )
}

export default memo(Search)