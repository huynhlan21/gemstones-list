import * as httpRequest from "../utils/httpRequest"

export const updateGemstone = async (id, stone) => {
    try {
        const res = await httpRequest.update("update-gemstones", { id, stone})
        return res.data
    } catch (err) {
        console.log("Error updateGemstone: ", err);
    }
} 