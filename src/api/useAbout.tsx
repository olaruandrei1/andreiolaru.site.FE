import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';

export type AboutData = {
    textBlocks: { title: string; content: string }[];
    cvDownloadUrl: string;
};

export const useAbout = () => {
    return useCachedFetch<AboutData>(
        'about',
        () => api.get('/about').then(res => res.data)
    );
};
