const { gql } = require('apollo-server');

const typeDefs = gql `

    type AirTemperature {
        id: ID
        place: String!
        date: String!
        value: Float
    }

    type WeatherData {
        id: ID
        place: String!
        date: String!
        value: Float
    }

    type AllWeatherData {
        id: ID
        place: String
        date: String
        Air_temperature: Float
        Wind_speed: Float
        Gust_speed: Float
        Wind_direction: Float
        Relative_humidity: Float
        Dew_point_temperature: Float
        Precipitation_amount: Float
        Precipitation_intensity: Float
        Snow_depth: Float
        Pressure: Float
        Horizontal_visibility: Float
        Cloud_amount: Float
    }

    type Recipe {
        id: ID
        name: String
        preptime: String
        image_link: String
        category: String
        description: String
        ingredients: String
        instructions: String
    }

    type Query {
        # airTemperature(place: String, start_time: String ,end_time: String) : AirTemperature
        airTemperatures(place: String, start_time: String ,end_time: String) : [WeatherData]
        windSpeeds(place: String, start_time: String ,end_time: String) : [WeatherData]
        gustSpeeds(place: String, start_time: String ,end_time: String) : [WeatherData]
        windDirections(place: String, start_time: String ,end_time: String) : [WeatherData]
        relativeHumidities(place: String, start_time: String ,end_time: String) : [WeatherData]
        dewPointTemps(place: String, start_time: String ,end_time: String) : [WeatherData]
        precipitationAmounts(place: String, start_time: String ,end_time: String) : [WeatherData]
        precipitationIntensities(place: String, start_time: String ,end_time: String) : [WeatherData]
        snowDepths(place: String, start_time: String ,end_time: String) : [WeatherData]
        pressures(place: String, start_time: String ,end_time: String) : [WeatherData]
        horiZontalVisibilities(place: String, start_time: String ,end_time: String) : [WeatherData]
        cloundAmounts(place: String, start_time: String ,end_time: String) : [WeatherData]
        allWeatherData(place: String, start_time: String ,end_time: String): [AllWeatherData]
        allRecipes(category: String, name: String, ingredient: String): [Recipe]
        getRecipeByCategory(category: String): [Recipe]
        getRecipesByName(name: String): [Recipe]
        getRecipesByIngredient(ingredient: String): [Recipe]

    }






`
module.exports = typeDefs;