import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';
import {ApiMap} from "../constants/ApiMap.tsx";

export type AboutData = {
    whoIAm: { title: string; content: string };
    mindset: { title: string; content: string };
    cvDownloadUrl: string;
};

export const useAbout = () => {
    return useCachedFetch<AboutData>(
        ApiMap.about.key,
        () => api.get(ApiMap.about.url).then(res => res.data)
    );
};
