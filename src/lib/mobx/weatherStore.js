import { makeAutoObservable } from 'mobx';
import { format } from 'date-fns';
import { api } from '../../api/api';

class WeatherStore {
    constructor() {
        this.data = [];
        this.dataPointer = 0;
        this.weatherType = null;
        this.minTemperature = null;
        this.maxTemperature = null;
        this.isFilterSet = false;
        makeAutoObservable(this);
    }

    setDataPointer(index) {
        this.dataPointer = index;
    }

    setFilterData(data) {
        this.dataPointer = 0;
        this.isFilterSet = true;
        this.weatherType = data.weatherType;
        this.minTemperature = data.minTemperature;
        this.maxTemperature = data.maxTemperature;  
    }

    resetFilterData() {
        this.isFilterSet = false;
        this.weatherType = null;
        this.minTemperature = null;
        this.maxTemperature = null;
    }

    async getData() {
        const data = await api.getWeather();
        this.data = data;
    }
    
    dayInfo(pointer) {
        const item = this.filteredData[pointer];
        const day = item.day;
        const date = new Date(day);
        const dayOfWeek = format(date, 'EEEE');
        const dayOfMonth = format(date, 'd');
        const monthName = format(date, 'MMMM');

        return {
            item,
            dayOfWeek,
            dayOfMonth,
            monthName   
        }
    }

    dayInfoExtend(item) {
        const day = item.day;
        const date = new Date(day);
        return {
            item,
            dayOfWeek: format(date, 'EEEE'),
            dayOfMonth: format(date, 'd'),
            monthName: format(date, 'MMMM'),
        }
    }

    get filteredData() {
        const filtered = this.data
            .filter(item => {
                if (this.weatherType) {

                    return item.type === this.weatherType;
                }
                return true;
            })
            .filter(item => {
                if (this.minTemperature !== null && this.minTemperature !== undefined && this.minTemperature !== '') {
                    return item.temperature >= +this.minTemperature;
                }
                return true;
            })
            .filter(item => {
                if (this.maxTemperature !== null && this.maxTemperature !== undefined && this.maxTemperature !== '') {
                    return item.temperature <= +this.maxTemperature;
                }
                return true;
            });
            return filtered;
    }
}
export const weatherStore = new WeatherStore();
