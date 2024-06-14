import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { weatherStore } from '../../lib/mobx/weatherStore';

export const Form = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedOption, setSelectedOption] = useState('');

  const _reset = () => {
    weatherStore.resetFilterData();  
    reset({
      weatherType: '',
      minTemperature: '',
      maxTemperature: '',
    });   
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <form className='filter' onSubmit = { handleSubmit(onSubmit) }>
      <div>
        <label className={`checkbox ${selectedOption === 'cloudy' ? 'selected' : ''}`}>
          <input
            type = "radio"
            value = "cloudy"
            { ...register('weatherType') }
            onChange={handleOptionChange}
          />
          Cloudy
          <span className="checkmark"></span>
        </label>
      </div>
      <div>
        <label className = {`checkbox ${selectedOption === 'sunny' ? 'selected' : ''}`}>
        <input
            type = "radio"
            value = "sunny"
            { ...register('weatherType') }
            onChange = {handleOptionChange}
          />
          Sunny
          <span className = "checkmark"></span>
        </label>
      </div>
      { errors.weatherType && <span>This field is required</span> }
      <div>
        <label className = 'custom-label custom-input'>
          Min Temperature:
          <input
            className = 'custom-input' 
            type = "number" 
            { ...register('minTemperature') } 
          />
        </label>
      </div>
      <div>
        <label className='custom-label custom-input'>
          Max Temperature:
          <input
            className = 'custom-input' 
            type = "number" 
            { ...register('maxTemperature')} 
          />
        </label>
      </div>
      { !weatherStore.isFilterSet && <button type = "submit">Filter</button> }
      { weatherStore.isFilterSet && <button type = "button" onClick = { () => _reset() }>Clean form</button> }
    </form>
  );
};
