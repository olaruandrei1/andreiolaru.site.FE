import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';

export type MeData = {
    title: string;
    job: string;
    description: string;
    imageUrl: string;
};

export const useMe = () => {
    return useCachedFetch<MeData>(
        'me',
        () => api.get('/me').then(res => res.data)
    );
};
