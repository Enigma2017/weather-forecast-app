import { observer } from 'mobx-react-lite';
import { StoresContext } from '../../lib/mobx/storeContext';
import { useContext } from 'react';
import { WeekWeatherItem } from '../WeekWeatherItem';

export const WeekWeather = observer(() => {
    const { weatherStore } = useContext(StoresContext);
    const weatherWeek = weatherStore.filteredData.slice(0, 7);
    return(
        <div className='forecast'>
            {weatherWeek.map((item, index) => {
                return(
                    <WeekWeatherItem key = { index + 'item' } pointer = { index } item = { item } />
                )
            })}
        </div>
    )
});