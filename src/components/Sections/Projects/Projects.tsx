import React, { useEffect, useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useProjects } from '../../../api/useProjects';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';

export const Projects: React.FC = () => {
    const { data, loading } = useProjects();
    const [pages, setPages] = useState<any[][]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateDevice = () => setIsMobile(window.innerWidth < 768);
        updateDevice();
        window.addEventListener('resize', updateDevice);
        return () => window.removeEventListener('resize', updateDevice);
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const perPage = 3; // mereu 3 per slide
        const newPages = [];
        for (let i = 0; i < data.length; i += perPage) {
            newPages.push(data.slice(i, i + perPage));
        }
        setPages(newPages);
    }, [data]);

    if (loading) {
        return (
            <section id="projects" className="py-16 text-center">
                <p className="text-gray-500 text-base">Loading...</p>
            </section>
        );
    }

    return (
        <section id="projects" className="min-h-screen py-16 px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-12">
                Latest Projects
            </h2>

            <Carousel>
                {pages.map((group, idx) => (
                    <div
                        key={idx}
                        className={`grid grid-cols-1 gap-y-6 w-full`}
                    >
                        {group.map((project, index) => (
                            <MorphBox
                                key={index}
                                title={undefined}
                                className="w-full aspect-[16/5] min-h-[140px] md:min-h-[150px] flex flex-col justify-between bg-white p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>

                                    <div className="flex flex-wrap gap-2">
                                        {(isMobile
                                                ? project.technologies.slice(0, 6)
                                                : project.technologies
                                        ).map(tech => (
                                            <span
                                                key={tech}
                                                className="text-sm px-2 py-1 rounded bg-neutral-100 text-neutral-700 font-medium shadow-sm"
                                            >
          {tech}
        </span>
                                        ))}
                                        {isMobile && project.technologies.length > 6 && (
                                            <span className="text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium shadow-sm">
          +⋯
        </span>
                                        )}
                                    </div>
                                </div>

                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 font-semibold text-sm hover:underline transition mt-4"
                                >
                                    View Repo ↗
                                </a>
                            </MorphBox>


                        ))}
                    </div>
                ))}
            </Carousel>
        </section>
    );
};
