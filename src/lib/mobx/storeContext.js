import React from 'react';
import { weatherStore } from './weatherStore';

export const StoresContext = React.createContext({
    weatherStore,
});
