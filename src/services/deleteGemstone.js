import * as httpRequest from "../utils/httpRequest"

export const deleteGemstone = async (id) => {
    try {
        const res = await httpRequest.del("delete-gemstones", {
            params: {
                id
            }
        })
        return res
    } catch (err) {
        console.log("Error deleteGemstone:", err);
    }
}