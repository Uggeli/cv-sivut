const { RESTDataSource } = require('apollo-datasource-rest');

class ProductApi extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = process.env.PRODUCTAPI;
    }

    async GetProduct(searchTerm){
        const headers = {
            'Authorization': `Token ${process.env.BACKEND_AUTH}`,
            'Finditem': searchTerm,
            
        }
        console.log("requestin headerit",headers)
        const response = await this.get('', {}, {
            headers: headers
        })
        
        return Array.isArray(response) ? response : []
    }

    async GetProducts(ItemArray){
        const FindItems = []
        for (let index = 0; index < ItemArray.length; index++) {
            const item = ItemArray[index].split(" ")
            FindItems.push(item[item.length -1])
        }
        const response = []
        for (let i = 0; i <FindItems.length; i++){
            const item = await this.GetProduct(FindItems[i])
            console.log(item)
            response.push(item)
        }
        // let response = await Promise.all(ItemArray.map(async(i) => {this.GetProduct(i)}))
        console.log(response)


        return response

    }
}

module.exports = ProductApi