import { useState, useEffect } from 'react';

export type AboutData = {
    textBlocks: { title: string; content: string }[];
    cvDownloadUrl: string;
};

export const useAbout = (): { data: AboutData | null; loading: boolean } => {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulăm API delay
        setTimeout(() => {
            setData({
                textBlocks: [
                    {
                        title: 'Who I am',
                        content: 'I’m a pragmatic engineer who values simplicity, performance and clean design.',
                    },
                    {
                        title: 'My mindset',
                        content: 'I believe in strong ownership, efficient collaboration and pushing beyond what’s expected.',
                    }
                ],
                cvDownloadUrl: '/assets/Andrei_Olaru_CV.pdf'
            });
            setLoading(false);
        }, 500);
    }, []);

    return { data, loading };
};
