import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';
import {ApiMap} from "../constants/ApiMap.tsx";

export type SocialLinks = {
    linkedin: string;
    github: string;
    x: string;
};

export const useSocialLinks = () => {
    return useCachedFetch<SocialLinks>(
        ApiMap.contact.key,
        () => api.get(ApiMap.contact.url).then(res => res.data)
    );
};
