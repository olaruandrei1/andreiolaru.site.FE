import { useCachedFetch } from './configuration/useCachedFetch.tsx';
import api from './configuration/axios.tsx';
import {ApiMap} from "../constants/ApiMap.tsx";

export type Skill = {
    name: string;
    svgUrl: string;
    order: number;
};

export type SkillCategory = {
    id: string;
    categoryName: string;
    order: number;
    skills: Skill[];
};

export const useSkills = () => {
    return useCachedFetch<SkillCategory[]>(
        ApiMap.skills.key,
        () => api.get(ApiMap.skills.url).then(res => res.data)
    );
};
