const { RESTDataSource } = require('apollo-datasource-rest');

class WeatherDataApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.WEATHERDATA;

    }

    async GetAllData({place, start_time, end_time}) {
        const response = await this.get(`?location=${place}&starttime=${start_time}&endtime${end_time}`, {}, {
             headers: {'Authorization': `Token ${process.env.BACKEND_AUTH}`}
        });
        // console.log(response)
        return Array.isArray(response) ? response : []
    }


    async GetPrecipitationIntensities({place, start_time, end_time}) {
        const data = await this.GetAllData({place, start_time, end_time});
        return Array.isArray(data)
            ? data.map(wdata => ({
                id: wdata.id,
                place: wdata.location,
                date: wdata.date,
                value: wdata.Precipitation_intensity,
            })).sort((a, b) => {
                let da = new Date(a.date),
                    db = new Date(b.date);
                return da-db;
            }) : [];
    }

    async GetAllWeatherData({place, starttime, endtime}) {
        // let numQueries = await this.calculate_cycles(starttime, endtime)
        // console.log(numQueries)
        const data = await this.GetAllData({place, starttime, endtime});
        return Array.isArray(data) 
        ? data.map(wdata => ({
            id: wdata.id,
            place: wdata.location,
            date: wdata.date,
            Air_temperature: wdata.Air_temperature,
            Wind_speed: wdata.Wind_speed,
            Gust_speed: wdata.Gust_speed,
            Wind_direction: wdata.Wind_direction,
            Relative_humidity: wdata.Relative_humidity,
            Dew_point_temperature: wdata.Dew_point_temperature,
            Precipitation_amount: wdata.Precipitation_amount,
            Precipitation_intensity: wdata.Precipitation_intensity,
            Snow_depth: wdata.Snow_depth,
            Pressure: wdata.Pressure,
            Horizontal_visibility: wdata.Horizontal_visibility,
            Cloud_amount: wdata.Cloud_amount,
        })).sort((a, b) => {
            let da = new Date(a.date),
                db = new Date(b.date)
            return da-db
        }) : [];
    }

    async GetPressures({place, start_time, end_time}) {
        const data = await this.GetAllData({place, start_time, end_time});
        return Array.isArray(data)
            ? data.map(wdata => ({
                id: wdata.id,
                place: wdata.location,
                date: wdata.date,
                value: wdata.Pressure,
            })).sort((a, b) => {
                let da = new Date(a.date),
                    db = new Date(b.date);
                return da-db;
            }) : [];
    }

    async GetHoriZontalVisibilities({place, start_time, end_time}) {
        const data = await this.GetAllData({place, start_time, end_time});
        return Array.isArray(data)
            ? data.map(wdata => ({
                id: wdata.id,
                place: wdata.location,
                date: wdata.date,
                value: wdata.Horizontal_visibility,
            })).sort((a, b) => {
                let da = new Date(a.date),
                    db = new Date(b.date);
                return da-db;
            }) : [];
    }

    async GetCloundAmounts({place, start_time, end_time}) {
        const data = await this.GetAllData({place, start_time, end_time});
        return Array.isArray(data)
            ? data.map(wdata => ({
                id: wdata.id,
                place: wdata.location,
                date: wdata.date,
                value: wdata.Cloud_amount,
            })).sort((a, b) => {
                let da = new Date(a.date),
                    db = new Date(b.date);
                return da-db;
            }) : [];
    }


}

module.exports = WeatherDataApi;