import * as httpRequest from "../utils/httpRequest"

export const searchGemstone = async (
    currentPage = 1,
    itemPerPage = 10,
    searchText="",
    sorting={}
) => {
    try {
        const res = await httpRequest.get("gemstones/search", {
            params: {
                currentPage,
                itemPerPage,
                searchText,
                sorting
            }
        })
        return res.data
    } catch (err) {
        console.log("Error searchGemstone: ", err);
    }
}