//import api from '../../api/api';
import { observer } from 'mobx-react-lite';
import { StoresContext } from '../../lib/mobx/storeContext';
import { useContext } from 'react';

export const WeekWeatherItem = observer(( { pointer, item } ) => {
    const { weatherStore } = useContext(StoresContext);

    const handleClick = () => {
        weatherStore.setDataPointer(pointer);
    };

    if( weatherStore.data.length === 0 ) return (<div>Loading...</div>);
    const { dayOfWeek } = weatherStore.dayInfoExtend(item);
    const isSelected = weatherStore.dataPointer === pointer;

    if(item) return (
        <div className = { `day ${ isSelected ? 'selected' : '' }` } 
             onClick = { handleClick } >
            <p className = 'day-week'>{ dayOfWeek }</p>
            <div className = 'forecast-icon'>
                <img src = { `../../assets/weather-icon-${ item.type }.png` } alt="weather icon"/>
            </div>
            <p className = "temperature">{ item.temperature }°</p>
        </div>                
    );
});       
