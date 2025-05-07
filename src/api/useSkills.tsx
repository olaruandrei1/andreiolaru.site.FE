import { useCachedFetch } from './configuration/useCachedFetch.tsx';
import api from './configuration/axios.tsx';

export type SkillCategory = {
    id: string;
    categoryName: string;
    skills: Record<string, string>;
};

export const useSkills = () => {
    return useCachedFetch<SkillCategory[]>(
        'skills',
        () => api.get('/skills').then(res => res.data)
    );
};
