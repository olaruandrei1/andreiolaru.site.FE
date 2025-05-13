import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';
import {ApiMap} from "../constants/ApiMap.tsx";

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
    photoPath: string;
};

export const useEducation = () => {
    return useCachedFetch<Education[]>(
        ApiMap.education.key,
        () => api.get(ApiMap.education.url).then(res => res.data)
    );
};
