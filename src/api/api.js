// Core
import axios from 'axios';

//const WEATHER_API_URL = 'https://lab.lectrum.io/rtx/api';
const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;

export const api = Object.freeze({
    async getWeather() {
        const { data } =  await axios.get(`${WEATHER_API_URL}/forecast`);

        return data.data;
    },
});
