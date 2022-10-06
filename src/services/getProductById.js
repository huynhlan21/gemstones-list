import * as httpRequest from "../utils/httpRequest"

export const getProductById = async (productId) => {
    try {
        const res = await httpRequest.get("product", {params: {productId}})
        return res.data
    } catch (err) {
        console.log("Error getProductById: ", err);
    }
}