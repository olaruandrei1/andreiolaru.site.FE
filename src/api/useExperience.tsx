import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';
import {ApiMap} from "../constants/ApiMap.tsx";

export type Experience = {
    company: string;
    title: string;
    period: string;
    description: string;
    photoPath: string;
};

export const useExperience = () => {
    return useCachedFetch<Experience[]>(
        ApiMap.experience.key,
        () => api.get(ApiMap.experience.url).then(res => res.data)
    );
};
