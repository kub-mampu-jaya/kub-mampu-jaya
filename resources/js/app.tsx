import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* --- Imported from template --- */
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { DirectionProvider } from './context/direction-provider';
import { FontProvider } from './context/font-provider';
import { ThemeProvider } from './context/theme-provider';

/* Optional */
// import { handleServerError } from '@/lib/handle-server-error';
import { handleServerError } from '@/lib/handle-server-error';
import { useAuthStore } from '@/stores/auth-store';

/* ------------------------------ */

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

/*
 |----------------------------------------------------------
 | Query Client (adapted from template main.tsx)
 |----------------------------------------------------------
*/
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (import.meta.env.DEV) console.log({ failureCount, error });

                if (failureCount >= 0 && import.meta.env.DEV) return false;
                if (failureCount > 3 && import.meta.env.PROD) return false;

                return !(
                    error instanceof AxiosError &&
                    [401, 403].includes(error.response?.status ?? 0)
                );
            },
            refetchOnWindowFocus: import.meta.env.PROD,
            staleTime: 10 * 1000, // 10 seconds
        },
        mutations: {
            onError: (error) => {
                handleServerError?.(error);

                if (error instanceof AxiosError) {
                    if (error.response?.status === 304) {
                        toast.error('Content not modified!');
                    }
                }
            },
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    toast.error('Session expired!');
                    useAuthStore?.getState()?.auth.reset();
                }
                if (error.response?.status === 500) {
                    toast.error('Internal Server Error!');
                }
            }
        },
    }),
});

/*
 |----------------------------------------------------------
 | Inertia App Setup
 |----------------------------------------------------------
*/
createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ThemeProvider>
                    <DirectionProvider>
                        <FontProvider>
                            <QueryClientProvider client={queryClient}>
                                <App {...props} />
                            </QueryClientProvider>
                        </FontProvider>
                    </DirectionProvider>
                </ThemeProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
