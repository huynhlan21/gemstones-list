import * as httpRequest from "../utils/httpRequest"

export const getProductList = async (startIndex=0, endIndex=10) => {
    try {
        const res = await httpRequest.get("products", {params: {startIndex, endIndex}})
        return res.data
    } catch (err) {
        console.log("Error getProductList: ", err);
    }
}