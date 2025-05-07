import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';

export type Project = {
    title: string;
    technologies: { name: string; icon: string }[];
    repoUrl: string;
};

export const useProjects = () => {
    return useCachedFetch<Project[]>('projects', () =>
        api.get('/projects').then(res => res.data)
    );
};
