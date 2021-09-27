module.exports = {
    Query: {
        allWeatherData: async (_, { place, start_time, end_time}, { dataSources }) => {
            return dataSources.weatherAPI.GetAllWeatherData({place, start_time, end_time});
        },
        airTemperatures: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetAirTemperatures({ place, start_time, end_time})
        },
        windSpeeds: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetWindSpeeds({ place, start_time, end_time})
        },
        gustSpeeds: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetGustSpeeds({ place, start_time, end_time})
        },
        windDirections: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetWindDirections({ place, start_time, end_time})
        },
        relativeHumidities: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetRelativeHumidities({ place, start_time, end_time})
        },
        dewPointTemps: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetDewPointTemp({ place, start_time, end_time})
        },
        precipitationAmounts: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetPrecipitationAmounts({ place, start_time, end_time})
        },
        precipitationIntensities: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetPrecipitationIntensities({ place, start_time, end_time})
        },
        snowDepths: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetSnowDepth({ place, start_time, end_time})
        },
        pressures: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetPressures({ place, start_time, end_time})
        },
        horiZontalVisibilities: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetHoriZontalVisibilities({ place, start_time, end_time})
        },
        cloundAmounts: async (_, { place, start_time, end_time }, { dataSources}) => {
            return dataSources.weatherAPI.GetCloundAmounts({ place, start_time, end_time})
        },
        allRecipes: async (_, { category, name, ingredient}, { dataSources }) => {
            return dataSources.RecipeApi.GetRecipes(category, name, ingredient)
        },
        getRecipeByCategory: async (_, { category }, { dataSources }) => {
            return dataSources.RecipeApi.GetRecipesByCategory(category)
        },
        getRecipesByName: async (_, { name }, { dataSources }) => {
            return dataSources.RecipeApi.GetRecipesByName(name)
        },
        getRecipesByIngredient: async (_, { ingredient }, { dataSources }) => {
            return dataSources.RecipeApi.GetRecipesByIngredient(ingredient)
        },
        GetProduct: async (_, {search_term}, { dataSources }) => {
            return dataSources.ProductApi.GetProduct(search_term)
        },
        GetProducts: async (_, {itemArray}, { dataSources}) => {
            return dataSources.ProductApi.GetProducts(itemArray)
        },

    }
}