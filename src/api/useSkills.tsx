// useSkills.ts
import { useEffect, useState } from 'react';

export type SkillCategory = {
    id: string;
    categoryName: string;
    skills: Record<string, string>; // { skillName: iconUrl }
};

export const useSkills = () => {
    const [data, setData] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setData([
                {
                    id: '1',
                    categoryName: 'Frontend',
                    skills: {
                        'React': '/icons/react.svg',
                        'Vue': '/icons/vue.svg',
                        'Angular': '/icons/angular.svg',
                        'Svelte': '/icons/svelte.svg',
                        'Alpine.js': '/icons/alpine.svg',
                        'Tailwind': '/icons/tailwind.svg',
                        'Bootstrap': '/icons/bootstrap.svg',
                        'jQuery': '/icons/jquery.svg',
                        'Lit': '/icons/lit.svg',
                        'Next.js': '/icons/nextjs.svg',
                        'Nuxt.js': '/icons/nuxt.svg',
                        'SolidJS': '/icons/solid.svg',
                        'Qwik': '/icons/qwik.svg',
                    },
                },
                {
                    id: '2',
                    categoryName: 'Backend',
                    skills: {
                        '.NET': '/icons/dotnet.svg',
                        'Spring Boot': '/icons/spring.svg',
                        'Node.js': '/icons/nodejs.svg',
                        'Express': '/icons/express.svg',
                        'Django': '/icons/django.svg',
                        'Flask': '/icons/flask.svg',
                        'Ruby on Rails': '/icons/rails.svg',
                        'Koa': '/icons/koa.svg',
                        'NestJS': '/icons/nest.svg',
                        'Hapi.js': '/icons/hapi.svg',
                        'ASP.NET Core': '/icons/aspnet.svg',
                    },
                },
                {
                    id: '3',
                    categoryName: 'Databases',
                    skills: {
                        'PostgreSQL': '/icons/postgresql.svg',
                        'MySQL': '/icons/mysql.svg',
                        'MongoDB': '/icons/mongodb.svg',
                        'Redis': '/icons/redis.svg',
                        'SQL Server': '/icons/sqlserver.svg',
                        'Oracle': '/icons/oracle.svg',
                        'Cassandra': '/icons/cassandra.svg',
                        'Firebase': '/icons/firebase.svg',
                    },
                },
                {
                    id: '4',
                    categoryName: 'Cloud & DevOps',
                    skills: {
                        'AWS': '/icons/aws.svg',
                        'Azure': '/icons/azure.svg',
                        'GCP': '/icons/gcp.svg',
                        'Docker': '/icons/docker.svg',
                        'Kubernetes': '/icons/k8s.svg',
                        'Terraform': '/icons/terraform.svg',
                        'GitHub Actions': '/icons/githubactions.svg',
                        'Jenkins': '/icons/jenkins.svg',
                        'GitLab CI': '/icons/gitlab.svg',
                        'ArgoCD': '/icons/argo.svg',
                    },
                },
                {
                    id: '5',
                    categoryName: 'Testing',
                    skills: {
                        'Jest': '/icons/jest.svg',
                        'Mocha': '/icons/mocha.svg',
                        'Chai': '/icons/chai.svg',
                        'Vitest': '/icons/vitest.svg',
                        'Playwright': '/icons/playwright.svg',
                        'Cypress': '/icons/cypress.svg',
                        'xUnit': '/icons/xunit.svg',
                        'NUnit': '/icons/nunit.svg',
                        'TestNG': '/icons/testng.svg',
                    },
                },
                {
                    id: '6',
                    categoryName: 'Tools',
                    skills: {
                        'VS Code': '/icons/vscode.svg',
                        'WebStorm': '/icons/webstorm.svg',
                        'Postman': '/icons/postman.svg',
                        'Insomnia': '/icons/insomnia.svg',
                        'Notion': '/icons/notion.svg',
                        'Figma': '/icons/figma.svg',
                        'Trello': '/icons/trello.svg',
                        'Jira': '/icons/jira.svg',
                        'Slack': '/icons/slack.svg',
                        'Zulip': '/icons/zulip.svg',
                    },
                },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    return { data, loading };
};
