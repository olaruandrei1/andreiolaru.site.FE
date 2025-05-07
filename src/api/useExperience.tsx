export type Experience = {
    company: string;
    title: string;
    period: string;
    description: string;
};

export const useExperience = (): { data: Experience[]; loading: boolean } => {
    const data: Experience[] = [
        {
            company: 'Access Software',
            title: 'Mid Software Engineer',
            period: 'May 2025 – Present',
            description: 'Working on cloud-native solutions '
        },
        {
            company: 'Banca Transilvania',
            title: 'Junior Software Engineer',
            period: 'Jan 2023 – Apr 2025',
            description: 'Working on cloud-native solutions for the'
        },
    ];

    return { data, loading: false };
};
