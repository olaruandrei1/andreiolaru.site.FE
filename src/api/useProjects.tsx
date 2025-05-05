// api/useProjects.ts
import { useState, useEffect } from 'react';

export type Project = {
    title: string;
    technologies: string[];
    repoUrl: string;
};

export const useProjects = (): { data: Project[]; loading: boolean } => {
    const [data, setData] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // mock data; will replace with real API call later
        const mock: Project[] = [
            {
                title: 'Portfolio Website',
                technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                repoUrl: 'https://github.com/yourusername/portfolio'
            },
            {
                title: 'Task Manager API',
                technologies: ['Node.js', 'Express', 'MongoDB'],
                repoUrl: 'https://github.com/yourusername/task-manager-api'
            },
            {
                title: 'Chat App',
                technologies: ['Socket.io', 'React', 'Node.js'],
                repoUrl: 'https://github.com/yourusername/chat-app'
            },
            {
                title: 'E-commerce Store',
                technologies: ['Next.js', 'Stripe', 'Prisma'],
                repoUrl: 'https://github.com/yourusername/ecommerce-store'
            },
            {
                title: 'Blog Platform',
                technologies: ['Gatsby', 'GraphQL', 'Markdown'],
                repoUrl: 'https://github.com/yourusername/blog-platform'
            },
            {
                title: 'Weather Dashboard',
                technologies: ['Vue.js', 'Axios', 'OpenWeather API'],
                repoUrl: 'https://github.com/yourusername/weather-dashboard'
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