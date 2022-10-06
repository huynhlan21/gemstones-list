import * as services from "../../services"

export const fetchSearchApi = async (
    passedCurrentPage, 
    passedItemPerPage,
    passedSearchText,
    passedSorting,
    globalStates
) => {
    passedCurrentPage = passedCurrentPage ? passedCurrentPage : globalStates.pagination.currentPage
    passedItemPerPage = passedItemPerPage ? passedItemPerPage : globalStates.pagination.itemPerPage
    if(Object.keys(globalStates.pagination).length > 0 && !globalStates.pagination.itemPerPageOption.includes(globalStates.pagination.itemPerPage)) {
        passedItemPerPage = globalStates.pagination.itemPerPageOption[0]
    }
    passedSearchText = passedSearchText ? passedSearchText : globalStates.searchText
    passedSorting = passedSorting ? passedSorting : globalStates.sorting

    const {data, currentPage, itemPerPage, itemPerPageOption, totalPage, totalItem} = 
        await services.searchGemstone(
            passedCurrentPage, 
            passedItemPerPage,
            passedSearchText,
            passedSorting
        )

    globalStates.setGemstones(data)
    globalStates.setPagination({
        currentPage, itemPerPage, itemPerPageOption, totalPage, totalItem
    })
}