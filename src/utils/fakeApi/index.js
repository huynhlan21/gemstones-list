import { createServer, Model } from "miragejs";
import { gemstoneList } from "./gemstoneList"
import { productList } from "./productList"

export const setupServer = () => {
    createServer({
        models: {
            gemstoneList: Model,
        },
        routes() {
            this.namespace = "api/";

            // get list of all stones
            this.get("all-gemstones", schema => {
                return schema.db.fullGemstoneList
            }) 

            // get list of stones with pagination
            this.get("gemstones", (schema, request) => {
                const {currentPage, itemPerPage} = request.queryParams

                const totalItem = schema.db.gemstoneList.length
                const totalPage = Math.ceil(totalItem/ itemPerPage)
                const firstShownItemIndex = currentPage * itemPerPage - itemPerPage
                const lastShownItemIndex = firstShownItemIndex*1 + itemPerPage*1
                const data = schema.db.gemstoneList.slice(firstShownItemIndex, lastShownItemIndex)

                return {
                    currentPage: currentPage*1,
                    itemPerPage: itemPerPage*1,
                    itemPerPageOption: [10, 20, 30, 40, 50],
                    totalPage,
                    totalItem,
                    data,
                }
            })

            // search
            this.get("gemstones/search", (schema, request) => {
                const {currentPage, itemPerPage, searchText, sorting} = request.queryParams

                // sorting
                const sortingObj = JSON.parse(sorting)
                const data = searchText ? 
                    schema.db.gemstoneList.filter(stone => stone.name.toLowerCase().includes(searchText)) :
                    schema.db.gemstoneList
                const sortedData = data.sort((a, b) => {
                    const sortRatio = Object.values(sortingObj)[0] === "increase" ? 1 : -1

                    if(typeof a[Object.keys(sortingObj)[0]] === "string") {
                        if (a[Object.keys(sortingObj)[0]].toString().toLowerCase() < b[Object.keys(sortingObj)[0]].toString().toLowerCase()) return -1 * sortRatio
                        if (a[Object.keys(sortingObj)[0]].toString().toLowerCase() > b[Object.keys(sortingObj)[0]].toString().toLowerCase()) return 1 * sortRatio
                        return 0
                    } else {
                        return (a[Object.keys(sortingObj)[0]] - b[Object.keys(sortingObj)[0]]) * sortRatio
                    }
                })

                const totalItem = sortedData.length
                const totalPage = Math.ceil(totalItem/ itemPerPage)
                const firstShownItemIndex = currentPage * itemPerPage - itemPerPage
                const lastShownItemIndex = firstShownItemIndex*1 + itemPerPage*1
                const slicedData = sortedData.slice(firstShownItemIndex, lastShownItemIndex)
                const itemPerPageOption = []
                for (let i = 0; i < totalItem; i+=10) {
                    if(i+10 > 50) break
                    itemPerPageOption.push(i + 10)
                }

                return {
                    currentPage: currentPage*1,
                    itemPerPage: itemPerPage*1,
                    itemPerPageOption: itemPerPageOption,
                    totalPage,
                    totalItem,
                    data: slicedData,
                }
            })

            // add a new stone
            this.post("gemstones", (schema, request) => {
                const newStone = JSON.parse(request.requestBody);
                schema.db.gemstoneList.insert(newStone)
                schema.db.fullGemstoneList.insert(newStone)
            })

            // delete a stone
            this.del("delete-gemstones", (schema, request) => {
                const id = request.queryParams.id
                return schema.db.gemstoneList.remove(id)
            })

            // update a current stone
            this.post("update-gemstones", (schema, request) => {
                const {id, stone} = JSON.parse(request.requestBody);
                schema.db.gemstoneList.update({id}, {...stone})
                schema.db.fullGemstoneList.update({id}, {...stone})
            })

            // get list of products
            this.get("products", (schema, request) => {
                const {startIndex, endIndex} = request.queryParams
                const totalItem = schema.db.productList.length
                return {
                    data: schema.db.productList.slice(startIndex, endIndex),
                    totalItem
                }
            }) 

            // get product by Id
            this.get("product", (schema, request) => {
                const {productId} = request.queryParams
                return schema.db.productList.find(productId)
            })
        },
        seeds(server) {
            server.db.loadData({
                gemstoneList,
                fullGemstoneList: gemstoneList,
                productList
            })
        }
    })
}