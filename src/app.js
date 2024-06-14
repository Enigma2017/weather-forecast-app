// Components
import { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoresContext } from './lib/mobx/storeContext';
import { CurrentDate } from './components/CurrentDate';
import { WeekWeather } from './components/WeekWeather';
import { Form } from './components/Form';

export const App = observer(() => {
    const { weatherStore } = useContext( StoresContext );
    useEffect(() => {
        weatherStore.getData();
    }, []);

    const handleFilterSubmit = ( data ) => {
        weatherStore.setFilterData( data );   
      };

    return (
        <main>
            { weatherStore.filteredData.length > 0 && <CurrentDate /> }
            { weatherStore.filteredData.length > 0 && <WeekWeather /> }
            { weatherStore.filteredData.length === 0 && <div className='message'>No results</div> }
            <Form onSubmit={handleFilterSubmit} />
        </main>
    );
});
