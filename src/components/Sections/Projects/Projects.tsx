import React, { useEffect, useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useProjects } from '../../../api/useProjects';
import { Carousel } from '../../UI/Carousel/Carousel.tsx';
import { MiniCarousel } from '../../UI/Carousel/MiniCarousel.tsx';

export const Projects: React.FC = () => {
    const { data, loading } = useProjects();
    const [pages, setPages] = useState<typeof data[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const updateDevice = () => setIsMobile(window.innerWidth < 768);
        updateDevice();
        window.addEventListener('resize', updateDevice);
        return () => window.removeEventListener('resize', updateDevice);
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const perPage = 3;
        const newPages = [];
        for (let i = 0; i < data.length; i += perPage) {
            newPages.push(data.slice(i, i + perPage));
        }
        setPages(newPages);
        console.log('PAGES:', newPages);
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
                {(showAll ? pages : pages.slice(0, 2)).map((group, idx) => (
                    <div key={idx} className="grid grid-cols-1 gap-y-6 w-full">
                        {group.map((project, index) => {
                            const globalIndex = idx * 3 + index;
                            return (

                                <MorphBox
                                key={index}
                                title={undefined}
                                className={`w-full aspect-[16/5] ${
                                    isMobile ? 'min-h-[170px]' : 'min-h-[150px]'
                                } flex flex-col justify-between bg-white p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300`}
                            >
                                <div className="space-y-3">
                                    <div className="relative w-full">
                                        {/* Fade left */}
                                        <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10" />
                                        {/* Fade right */}
                                        <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10" />
                                        {/* Scrollable title */}
                                        <h3
                                            className="text-lg font-semibold text-neutral-900 overflow-x-auto whitespace-nowrap no-scrollbar pr-4 pl-4"
                                            style={{ WebkitOverflowScrolling: 'touch' }}
                                        >
                                            {project.title}
                                        </h3>
                                    </div>

                                    {isMobile ? (
                                        <div className="relative w-full" onClick={() => setExpandedIndex(globalIndex)}>
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-1">
                                              <span className="animate-pulse text-blue-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="20"
                                                    viewBox="0 96 960 960"
                                                    width="20"
                                                    fill="currentColor"
                                                >
                                                  <path d="M559 936 369 746l190-190 43 43-107 107h296v60H465l107 107-43 43Z" />
                                                </svg>
                                              </span>
                                            </div>

                                            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white via-white/60 to-transparent z-10" />

                                            <MiniCarousel>
                                                {(project.technologies ?? []).map((tech) => (
                                                    <span
                                                        key={tech.name}
                                                        className="text-sm px-2 py-1 rounded bg-neutral-100 text-neutral-700 font-medium shadow-sm flex items-center gap-1"
                                                    >
                                                      <img
                                                          src={tech.icon ?? "/svgs/default.svg"}
                                                          alt={tech.name}
                                                          className="w-4 h-4"
                                                      />
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </MiniCarousel>
                                        </div>
                                    ) : (
                                        <MiniCarousel onClick={() => setExpandedIndex(globalIndex)}>
                                            {(project.technologies ?? []).map((tech) => (
                                                <span
                                                    key={tech.name}
                                                    className="text-sm px-2 py-1 rounded bg-neutral-100 text-neutral-700 font-medium shadow-sm flex items-center gap-1"
                                                >
                                                    <img
                                                        src={tech.icon ?? "/svgs/default.svg"}
                                                        alt={tech.name}
                                                        className="w-4 h-4"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = "/svgs/default.svg";
                                                        }}
                                                    />
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </MiniCarousel>
                                    )}
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
                        )})}
                    </div>
                ))}

                {!showAll && (
                    <div className="flex justify-center items-center w-full min-h-[150px]">
                        <button
                            onClick={() => setShowAll(true)}
                            className="text-blue-600 font-semibold hover:underline text-sm"
                        >
                            See more →
                        </button>
                    </div>
                )}
            </Carousel>

            {expandedIndex !== null && (
                <>
                    <div
                        onClick={() => setExpandedIndex(null)}
                        className="fixed inset-0 bg-black/50 z-50"
                    />
                    <div className="fixed top-1/2 left-1/2 w-[90vw] max-w-2xl max-h-[70vh] -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto">
                        <MorphBox
                            solid
                            title={pages.flat()[expandedIndex]?.title ?? 'Technologies'}
                            className="bg-white backdrop-blur-none border border-neutral-200 shadow-2xl"
                        >
                            <div className="flex flex-wrap gap-2">
                                {(pages.flat()[expandedIndex]?.technologies ?? []).map((tech) => {
                                    return (
                                        <span
                                            key={tech.name}
                                            className="text-sm px-2 py-1 rounded bg-neutral-100 text-neutral-700 font-medium shadow-sm flex items-center gap-1"
                                        >
                                            <img
                                                src={tech.icon}
                                                alt={tech.name} className="w-4 h-4"
                                                onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = "/svgs/default.svg";}}
                                            />
                                            {tech.name}
                                        </span>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => setExpandedIndex(null)}
                                className="mt-4 text-blue-600 font-semibold text-sm hover:underline"
                            >
                                Close
                            </button>
                        </MorphBox>
                    </div>
                </>
            )}
        </section>
    );
};