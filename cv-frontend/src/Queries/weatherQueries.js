import {gql} from '@apollo/client'


export const AIRTEMPS = gql`
  query AirTemp($airTemperaturesPlace: String, $airTemperaturesStartTime: String, $airTemperaturesEndTime: String) {
        airTemperatures(place: $airTemperaturesPlace, start_time: $airTemperaturesStartTime, end_time: $airTemperaturesEndTime) {
            id
            place
            date
            value
        }
    }
`;

export const ALL = gql`
  query Query($allWeatherDataPlace: String, $allWeatherDataStarttime: String, $allWeatherDataEndtime: String) {
  allWeatherData(place: $allWeatherDataPlace, starttime: $allWeatherDataStarttime, endtime: $allWeatherDataEndtime) {
    id
    place
    date
    Air_temperature
    Wind_speed
    Gust_speed
    Wind_direction
    Relative_humidity
    Dew_point_temperature
    Precipitation_amount
    Precipitation_intensity
    Snow_depth
    Pressure
    Horizontal_visibility
    Cloud_amount
  }
}
`;