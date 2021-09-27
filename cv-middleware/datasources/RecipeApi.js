const { RESTDataSource } = require('apollo-datasource-rest');

class RecipeApi extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = process.env.RECIPEAPI;
    }

    async GetRecipes(category='', name='', ingredients=''){
        const headers = {
            'Authorization': `Token ${process.env.BACKEND_AUTH}`,
            'Category': category,
            'name': name,
            'ingredients': ingredients
        }
        console.log("requestin headerit",headers)
        const response = await this.get('', {}, {
            headers: headers
        })
        
        return Array.isArray(response) ? response : []
    }

    async GetRecipesByCategory(category){
        return await this.GetRecipes(category)
    }

    async GetRecipesByName(name){
        return await this.GetRecipes('', name)
    }

    async GetRecipesByIngredient(ingredient){
        return await this.GetRecipes('', '', ingredient)
    }


}

module.exports = RecipeApi;