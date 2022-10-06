import * as httpRequest from "../utils/httpRequest"

export const loadingGemstoneList = async (
    currentPage = 1,
    itemPerPage = 10
) => {
    try {
        const res = await httpRequest.get("gemstones", {
            params: {
                currentPage,
                itemPerPage
            }
        })
        return res.data
    } catch (err) {
        console.log("Error loadingGemstoneList: ", err);
    }
}