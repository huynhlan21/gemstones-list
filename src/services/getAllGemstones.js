import * as httpRequest from "../utils/httpRequest"

export const getAllGemstones = async () => {
    try {
        const res = await httpRequest.get("all-gemstones")
        return res.data
    } catch (err) {
        console.log("Error getAllGemstones: ", err);
    }
}