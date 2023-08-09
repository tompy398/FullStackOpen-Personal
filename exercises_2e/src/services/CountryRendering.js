import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountryList = async () => {
    const request = axios.get(`${baseUrl}/all`)
    const response = await request
    return response.data.map((country, index) => {
        return {
            "id": index + 1,
            "name": country.name.common,
            "show": false
        }
    })
}

const getCountryInfo = async (CountryName) => {
    const statsRequest = axios.get(`${baseUrl}/name/${CountryName}`)
    const statsResponse = await statsRequest

    const countryLat = statsResponse.data.capitalInfo.latlng[0]
    const countryLon = statsResponse.data.capitalInfo.latlng[1]

    const API_KEY = process.env.REACT_APP_API_KEY
    const exclusionList = "minutely,hourly,daily,alerts"
    const weatherRequest = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${countryLat}&lon=${countryLon}&exclude=${exclusionList}&units=metric&appid=${API_KEY}`)
    const weatherResponse = await weatherRequest
    
    const weatherImgType = weatherResponse.data.current.weather[0].icon
    console.log("Weather Img Type:", weatherImgType)
    const weatherIcon = `https://openweathermap.org/img/wn/${weatherImgType}@2x.png`
    console.log(weatherIcon)
    
    return {
        "name": statsResponse.data.name.common,
        "capital": statsResponse.data.capital[0],
        "area": statsResponse.data.area,
        "languages": Object.values(statsResponse.data.languages),
        "flag": statsResponse.data.flags.png,
        "temp": weatherResponse.data.current.temp,
        "wind": weatherResponse.data.current.wind_speed,
        "icon": weatherIcon
    }
    /*
    return {
        "name": response.data.name.common,
        "capital": response.data.capital[0],
        "area": response.data.area,
        "languages": Object.values(response.data.languages),
        "flag": response.data.flags.png, 
        "capitalLat": response.data.capitalInfo.latlng[0],
        "capitalLon": response.data.capitalInfo.latlng[1]
    }
    */
}

const getWeather = async (Lat, Lon) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const exclusionList = "minutely,hourly,daily,alerts"
    const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${Lat}&lon=${Lon}&exclude=${exclusionList}&appid=${API_KEY}`)
    const response = await request
    return {
        "temp": response.data.current.temp,
        "wind": response.data.current.wind_speed
    }
}

export default { getCountryList, getCountryInfo , getWeather }