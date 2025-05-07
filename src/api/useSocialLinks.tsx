import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';

export type SocialLinks = {
    linkedin: string;
    github: string;
    x: string;
};

export const useSocialLinks = () => {
    return useCachedFetch<SocialLinks>(
        'social-links',
        () => api.get('/contact').then(res => res.data)
    );
};
