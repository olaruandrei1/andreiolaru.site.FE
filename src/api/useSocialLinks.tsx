// api/useSocialLinks.ts
import { useState, useEffect } from 'react';

export type SocialLinks = {
    linkedin: string;
    github: string;
    x: string;
};

export const useSocialLinks = (): { data: SocialLinks | null; loading: boolean } => {
    const [data, setData] = useState<SocialLinks | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // mock fetch; replace with axios/fetch when API is ready
        const mock: SocialLinks = {
            linkedin: 'https://www.linkedin.com/in/yourprofile',
            github:   'https://github.com/yourusername',
            x:        'https://x.com/yourhandle',
        };
        const timer = setTimeout(() => {
            setData(mock);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { data, loading };
};
