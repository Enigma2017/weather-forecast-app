//import api from '../../api/api';
import { observer } from 'mobx-react-lite';
import { StoresContext } from '../../lib/mobx/storeContext';
import { useContext } from 'react';

export const CurrentDate = observer(() => {
    const { weatherStore } = useContext(StoresContext);
    if(weatherStore.data.length === 0) return (<div>Loading...</div>);
    const { item, dayOfWeek, dayOfMonth, monthName } = weatherStore.dayInfo(weatherStore.dataPointer);

    if(item) return (
        <div>
            <div className = "head">
                <div className = 'icon'>
                    <img src = { `../../assets/weather-icon-${ item.type }.png` } alt = "weather icon"/>
                </div>
                <div className = 'current-date'>
                    <p>{ dayOfWeek }</p>
                    <span>{ dayOfMonth } { monthName }</span>
                </div>
            </div>                  
            <div className = 'current-weather'>
                <p className = "temperature">{ item.temperature }°</p>
                <div className = 'current-meta'>
                    <div>
                        <img src = '../../assets/rainy.png' alt = 'rain' />
                        <span className='rainy'>{ item.rain_probability }%</span>
                    </div>
                    <div>
                        <img src = '../../assets/humidity.png' alt = 'humidity' />
                        <span className = 'humidity'>{ item.humidity }</span>
                    </div>
                </div>
            </div>
        </div>                
    );
});       
