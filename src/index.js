import { createRoot } from 'react-dom/client';
import { App } from './app';

// Instruments
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoresContext } from './lib/mobx/storeContext';
import { weatherStore } from './lib/mobx/weatherStore';
import './theme/index.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StoresContext.Provider value = { { weatherStore } }>
        <QueryClientProvider client = { queryClient }>
            <App />
        </QueryClientProvider>
    </StoresContext.Provider>,
);
