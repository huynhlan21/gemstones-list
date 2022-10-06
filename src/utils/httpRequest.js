import axios from "axios"

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const get = async (path, option= {}) => {
    const res = await httpRequest.get(path, option)
    return res
}

const del = async (path, stoneInfo) => {
    const res = await httpRequest.delete(path, stoneInfo)
    return res
}

const add = async (path, newStone) => {
    const res = await httpRequest.post(path, newStone)
    return res
}

const update = async (path, updatedStone) => {
    const res = await httpRequest.post(path, updatedStone)
    return res
}

export { get, del, add, update }