import * as httpRequest from "../utils/httpRequest"

export const addNewGemstone = async (newStone) => {
    try {
        const res = await httpRequest.add("gemstones", newStone)
        return res.data
    } catch (err) {
        console.log("Error addNewGemStone", err);
    }
}