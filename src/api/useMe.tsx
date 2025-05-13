import { useCachedFetch } from './configuration/useCachedFetch';
import api from './configuration/axios';
import { ApiMap } from '../constants/ApiMap';

export type MeData = {
    title: string;
    job: string;
    description: string;
    imageUrl: string;
};

export const useMe = () => {
    return useCachedFetch<MeData>(
        ApiMap.me.key,
        () => api.get(ApiMap.me.url).then(res => res.data)
    );
};
