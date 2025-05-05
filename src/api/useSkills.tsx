import { useEffect, useState } from 'react';

export type Skill = {
    name: string;
    iconUrl: string;
};

export const useSkills = (category: string): { data: Skill[]; loading: boolean } => {
    const [data, setData] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const mockData: Record<string, Skill[]> = {
                frontend: [
                    { name: 'React', iconUrl: '/assets/skills/react.svg' },
                    { name: 'Angular', iconUrl: '/assets/skills/angular.svg' },
                    { name: 'Vue', iconUrl: '/assets/skills/vue.svg' },
                ],
                backend: [
                    { name: '.NET', iconUrl: '/assets/skills/dotnet.svg' },
                    { name: 'Spring Boot', iconUrl: '/assets/skills/springboot.svg' },
                ],
                cloud: [
                    { name: 'Azure', iconUrl: '/assets/skills/azure.svg' },
                    { name: 'AWS', iconUrl: '/assets/skills/aws.svg' },
                ],
                database: [
                    { name: 'SQL Server', iconUrl: '/assets/skills/sqlserver.svg' },
                    { name: 'PostgreSQL', iconUrl: '/assets/skills/postgresql.svg' },
                ],
                ci: [
                    { name: 'GitHub Actions', iconUrl: '/assets/skills/githubactions.svg' },
                    { name: 'Jenkins', iconUrl: '/assets/skills/jenkins.svg' },
                ],
                tools: [
                    { name: 'Docker', iconUrl: '/assets/skills/docker.svg' },
                    { name: 'Figma', iconUrl: '/assets/skills/figma.svg' },
                ],
                methods: [
                    { name: 'Agile', iconUrl: '/assets/skills/agile.svg' },
                    { name: 'Scrum', iconUrl: '/assets/skills/scrum.svg' },
                ],
            };

            setData(mockData[category] || []);
            setLoading(false);
        }, 500);
    }, [category]);

    return { data, loading };
};
