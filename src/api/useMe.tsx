import { useState, useEffect } from 'react';

type MeData = {
    title: string;
    job: string;
    description: string;
    imageUrl: string;
};

export const useMe = (): { data: MeData | null; loading: boolean } => {
    const [data, setData] = useState<MeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setData({
                title: 'Hey, I’m Andrei 👋',
                job: 'Mid Software Engineer',
                description: 'I love crafting performant systems, exploring tech, and building clean UIs.',
                imageUrl: 'public/photo.png' // mock image path
            });
            setLoading(false);
        }, 500);
    }, []);

    return { data, loading };
};
