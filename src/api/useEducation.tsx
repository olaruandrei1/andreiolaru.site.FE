import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';

export enum EducationVariant {
    CLASSIC = 'CLASSIC',
    SECONDARY = 'SECONDARY',
    PRIMARY = 'PRIMARY',
}

export type Education = {
    institution: string;
    degree: string;
    period: string;
    description: string;
    variant: EducationVariant;
};

export const useEducation = () => {
    return useCachedFetch<Education[]>(
        'education',
        () => api.get('/education').then(res => res.data)
    );
};
