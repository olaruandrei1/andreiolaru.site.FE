// components/Sections/Projects/Projects.tsx
import React from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useProjects } from '../../../api/useProjects';

export const Projects: React.FC = () => {
    const { data, loading } = useProjects();

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <section
            id="projects"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 0',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* Page Title */}
            <h2
                style={{
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    textAlign: 'center',
                    marginBottom: '2rem',
                }}
            >
                Latest Projects
            </h2>

            {/* Projects Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: '1fr',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '0 2rem',
                    boxSizing: 'border-box',
                }}
            >
                {data.map((project, idx) => (
                    <MorphBox key={idx} title={project.title} style={{ height: '100%' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                marginBottom: '1rem',
                            }}
                        >
                            {project.technologies.map(tech => (
                                <span
                                    key={tech}
                                    style={{
                                        fontSize: '0.875rem',
                                        padding: '0.25rem 0.5rem',
                                        background: 'rgba(0,0,0,0.05)',
                                        borderRadius: '4px',
                                        color: '#1c1c1e',
                                    }}
                                >
                  {tech}
                </span>
                            ))}
                        </div>
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#007AFF',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            View Repo ↗
                        </a>
                    </MorphBox>
                ))}
            </div>
        </section>
    );
};