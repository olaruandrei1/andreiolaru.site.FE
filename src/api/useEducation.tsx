import { useState, useEffect } from 'react';

export enum EducationVariant {
    CLASSIC = 'CLASSIC',
    SECONDARY = 'SECONDARY',
    PRIMARY = 'PRIMARY',
}

export type Education = {
    institution: string;
    degree: string;
    period: string;
    description: string;
    variant: EducationVariant;
};

export const useEducation = (): { data: Education[]; loading: boolean } => {
    const [data, setData] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mock: Education[] = [
            {
                institution: 'University of Technology',
                degree: 'B.Sc. Computer Science',
                period: 'Sept 2018 – Jun 2022',
                description: 'Studied algorithms, data structures, and software engineering principles.',
                variant: EducationVariant.PRIMARY,
            },
            {
                institution: 'Online Bootcamp',
                degree: 'Full-Stack Web Development',
                period: 'Jul 2022 – Dec 2022',
                description: 'Intensive program covering React, Node.js, and cloud deployments.',
                variant: EducationVariant.SECONDARY,
            },
            {
                institution: 'Graduate Diploma',
                degree: 'UX/UI Design',
                period: 'Jan 2023 – Jun 2023',
                description: 'Focused on user-centered design, prototyping, and accessibility best practices.',
                variant: EducationVariant.CLASSIC,
            },
        ];
        const timer = setTimeout(() => {
            setData(mock);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return { data, loading };
};
