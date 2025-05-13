import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';
import {ApiMap} from "../constants/ApiMap.tsx";

export type Project = {
    title: string;
    technologies: { name: string; icon: string }[];
    repoUrl: string;
};

export const useProjects = () => {
    return useCachedFetch<Project[]>(ApiMap.projects.key, () =>
        api.get(ApiMap.projects.url).then(res => res.data)
    );
};
